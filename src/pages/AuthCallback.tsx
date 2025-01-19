import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // 一時的に常にユーザーページにリダイレクト
    navigate('/user');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl">リダイレクト中...</div>
    </div>
  );
}