/*
  # Initial Schema Setup for Dental Shift Manager

  1. New Tables
    - users
      - id (uuid, primary key)
      - email (text)
      - name (text)
      - created_at (timestamp)
      
    - shift_submissions
      - id (uuid, primary key)
      - user_id (uuid, references users)
      - year_month (text)
      - submitted_at (timestamp)
      - message (text)
      
    - shift_dates
      - id (uuid, primary key)
      - submission_id (uuid, references shift_submissions)
      - date (date)
      - time_slot (text)
      
    - settings
      - id (uuid, primary key)
      - key (text)
      - value (jsonb)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Shift submissions table
CREATE TABLE shift_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  year_month text NOT NULL,
  submitted_at timestamptz DEFAULT now(),
  message text
);

ALTER TABLE shift_submissions ENABLE ROW LEVEL SECURITY;

-- Shift dates table
CREATE TABLE shift_dates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id uuid REFERENCES shift_submissions(id) NOT NULL,
  date date NOT NULL,
  time_slot text NOT NULL,
  CONSTRAINT valid_time_slot CHECK (
    time_slot IN (
      '9:00-13:00',
      '9:00-18:00',
      '9:00-21:00',
      '13:00-18:00',
      '13:00-21:00',
      '18:00-21:00',
      '9:30-13:00',
      '9:30-18:00',
      '13:00-18:00'
    )
  )
);

ALTER TABLE shift_dates ENABLE ROW LEVEL SECURITY;

-- Settings table
CREATE TABLE settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Insert default settings
INSERT INTO settings (key, value) VALUES
  ('site_title', '"北上尾歯科 シフト管理"'::jsonb),
  ('admin_password', '"kitaageo0000"'::jsonb),
  ('developer_password', '"lynx"'::jsonb),
  ('theme_color', '"#48d1cc"'::jsonb);

-- RLS Policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON shift_submissions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own submissions"
  ON shift_submissions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read own shift dates"
  ON shift_dates
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM shift_submissions
    WHERE shift_submissions.id = shift_dates.submission_id
    AND shift_submissions.user_id = auth.uid()
  ));