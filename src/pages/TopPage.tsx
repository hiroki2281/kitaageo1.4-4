import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2 } from 'lucide-react';

export default function TopPage() {
  const navigate = useNavigate();

  // 一時的に直接ユーザーページに遷移するように変更
  const handleStart = () => {
    navigate('/user');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">北上尾歯科 シフト管理</h1>
      
      <div className="mb-8">
        <Building2 size={120} className="text-[#48d1cc]" />
      </div>

      <div className="space-y-4 w-full max-w-md">
        <button
          onClick={handleStart}
          className="w-full bg-[#48d1cc] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#3bb3b3] transition-colors"
        >
          スタート
        </button>
        
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => navigate('/admin')}
            className="bg-gray-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-700 transition-colors"
          >
            管理者ログイン
          </button>
          <button
            onClick={() => navigate('/developer')}
            className="bg-gray-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-700 transition-colors"
          >
            開発者ログイン
          </button>
        </div>
      </div>
    </div>
  );
}