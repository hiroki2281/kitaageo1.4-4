import React, { useState } from 'react';
import { Calendar, MessageSquare, Home, Download, Filter, Search, ArrowDown, ChevronRight, ChevronDown, Edit3 } from 'lucide-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import jaLocale from '@fullcalendar/core/locales/ja';
import { useNavigate } from 'react-router-dom';
import ShiftCalendarCell from '../components/ShiftCalendarCell';

// ダミーデータ - 後でSupabaseから取得するデータ
const shiftSubmissions = [
  {
    id: 1,
    userName: '山田 花子',
    submissions: [
      {
        date: '2024-03-15',
        timeSlot: '9:00-18:00',
        submittedAt: '2024-03-10 15:30:00',
      },
      {
        date: '2024-03-16',
        timeSlot: '13:00-21:00',
        submittedAt: '2024-03-10 15:30:00',
      }
    ],
    message: '可能な限り早番希望です'
  },
  {
    id: 2,
    userName: '鈴木 一郎',
    submissions: [
      {
        date: '2024-03-15',
        timeSlot: '13:00-21:00',
        submittedAt: '2024-03-10 16:45:00',
      }
    ],
    message: ''
  }
];

export default function AdminPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'calendar' | 'logs' | 'editor'>('calendar');
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedUsers, setExpandedUsers] = useState<number[]>([]);
  const [editorMode, setEditorMode] = useState<'view' | 'edit'>('view');
  const [selectedColor, setSelectedColor] = useState('#48d1cc');

  const colors = [
    '#48d1cc',
    '#ff6b6b',
    '#4ecdc4',
    '#45b7d1',
    '#96ceb4',
    '#ffeead',
    '#ff9999',
    '#99ccff'
  ];

  const toggleUserExpand = (userId: number) => {
    setExpandedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleExportData = () => {
    // TODO: データのエクスポート処理
    console.log('Exporting data...');
  };

  // カレンダーのカスタムレンダリング
  const renderEventContent = (eventInfo: any) => {
    const { timeSlotPosition, isSpanning } = eventInfo.event.extendedProps;
    const style = {
      backgroundColor: selectedColor,
      padding: '2px 4px',
      borderRadius: '4px',
      color: 'white',
      fontSize: '0.75rem'
    };
    
    return (
      <div style={style}>
        <div>{eventInfo.event.title}</div>
        {isSpanning && timeSlotPosition === 'top' && (
          <div className="text-center">↓</div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">北上尾歯科 シフト管理（管理者）</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
              title="トップページへ戻る"
            >
              <Home size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* タブナビゲーション */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'calendar'
                ? 'bg-[#48d1cc] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Calendar size={20} />
            <span>シフト希望カレンダー</span>
          </button>
          <button
            onClick={() => setActiveTab('editor')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'editor'
                ? 'bg-[#48d1cc] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Edit3 size={20} />
            <span>シフト作成</span>
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'logs'
                ? 'bg-[#48d1cc] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MessageSquare size={20} />
            <span>ユーザーログ</span>
          </button>
        </div>

        {/* カレンダー表示 */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">シフト希望カレンダー</h2>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleExportData}
                    className="flex items-center space-x-2 bg-[#48d1cc] text-white px-4 py-2 rounded-lg hover:bg-[#3bb3b3]"
                  >
                    <Download size={20} />
                    <span>エクスポート</span>
                  </button>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-[#48d1cc] focus:ring focus:ring-[#48d1cc] focus:ring-opacity-50"
                  >
                    <option value="2024-03">2024年3月</option>
                    <option value="2024-04">2024年4月</option>
                    <option value="2024-05">2024年5月</option>
                  </select>
                </div>
              </div>
              <div className="calendar-container">
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin]}
                  initialView="dayGridMonth"
                  locale={jaLocale}
                  headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek'
                  }}
                  height="auto"
                  weekends={true}
                  businessHours={{
                    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                    startTime: '09:00',
                    endTime: '21:00',
                  }}
                  slotMinTime="09:00:00"
                  slotMaxTime="21:00:00"
                  eventContent={renderEventContent}
                  dayCellContent={(arg) => (
                    <ShiftCalendarCell
                      dayNumber={arg.dayNumberText}
                      isWeekend={arg.date.getDay() === 0 || arg.date.getDay() === 6}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        )}

        {/* シフト作成エディタ */}
        {activeTab === 'editor' && (
          <div className="grid grid-cols-12 gap-6">
            {/* シフト希望カレンダー（参照用） */}
            <div className="col-span-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">シフト作成</h2>
                <div className="calendar-container">
                  <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    locale={jaLocale}
                    headerToolbar={{
                      left: 'prev,next today',
                      center: 'title',
                      right: ''
                    }}
                    height="auto"
                    weekends={true}
                    editable={editorMode === 'edit'}
                    eventContent={renderEventContent}
                    dayCellContent={(arg) => (
                      <ShiftCalendarCell
                        dayNumber={arg.dayNumberText}
                        isWeekend={arg.date.getDay() === 0 || arg.date.getDay() === 6}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            {/* エディタパネル */}
            <div className="col-span-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">編集ツール</h3>
                
                {/* 編集モード切り替え */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    編集モード
                  </label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setEditorMode('view')}
                      className={`px-4 py-2 rounded-lg ${
                        editorMode === 'view'
                          ? 'bg-[#48d1cc] text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      閲覧
                    </button>
                    <button
                      onClick={() => setEditorMode('edit')}
                      className={`px-4 py-2 rounded-lg ${
                        editorMode === 'edit'
                          ? 'bg-[#48d1cc] text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      編集
                    </button>
                  </div>
                </div>

                {/* カラーパレット */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    背景色
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full ${
                          selectedColor === color ? 'ring-2 ring-offset-2 ring-[#48d1cc]' : ''
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* 操作履歴 */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    操作履歴
                  </label>
                  <div className="space-y-2">
                    <button
                      className="w-full px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      onClick={() => {/* TODO: 元に戻す処理 */}}
                    >
                      元に戻す（1つ前）
                    </button>
                    <button
                      className="w-full px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      onClick={() => {/* TODO: 2つ前に戻す処理 */}}
                    >
                      元に戻す（2つ前）
                    </button>
                  </div>
                </div>

                {/* テキストラベル */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    テキストラベル
                  </label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#48d1cc] focus:ring focus:ring-[#48d1cc] focus:ring-opacity-50"
                  >
                    <option value="">テキストを選択...</option>
                    <option value="休診日">休診日</option>
                    <option value="研修日">研修日</option>
                    <option value="祝日">祝日</option>
                  </select>
                </div>

                {/* その他の操作 */}
                <div>
                  <button
                    className="w-full px-4 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                    onClick={() => {/* TODO: オールクリア処理 */}}
                  >
                    オールクリア
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ユーザーログ */}
        {activeTab === 'logs' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">シフト希望ログ</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="ユーザー名で検索..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 rounded-md border-gray-300 shadow-sm focus:border-[#48d1cc] focus:ring focus:ring-[#48d1cc] focus:ring-opacity-50"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                    <Filter size={20} />
                    <span>フィルター</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {shiftSubmissions.map((user) => (
                <div key={user.id} className="p-4">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleUserExpand(user.id)}
                  >
                    <div className="flex items-center space-x-4">
                      {expandedUsers.includes(user.id) ? (
                        <ChevronDown className="text-gray-400" />
                      ) : (
                        <ChevronRight className="text-gray-400" />
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{user.userName}</div>
                        <div className="text-sm text-gray-500">
                          {user.submissions.length}件のシフト希望
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      最終更新: {user.submissions[0].submittedAt}
                    </div>
                  </div>
                  
                  {expandedUsers.includes(user.id) && (
                    <div className="mt-4 pl-8">
                      <div className="bg-gray-50 rounded-lg p-4">
                        {user.message && (
                          <div className="mb-4 text-sm text-gray-700">
                            <span className="font-medium">メモ:</span> {user.message}
                          </div>
                        )}
                        <div className="space-y-2">
                          {user.submissions.map((submission, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between text-sm"
                            >
                              <div className="text-gray-700">
                                {new Date(submission.date).toLocaleDateString('ja-JP', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  weekday: 'long'
                                })}
                              </div>
                              <div className="text-gray-600">{submission.timeSlot}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}