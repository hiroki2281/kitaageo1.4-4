import React, { useState } from 'react';
import { Terminal, Database, Activity, LogOut, RefreshCw } from 'lucide-react';

export default function DeveloperPage() {
  const [activeTab, setActiveTab] = useState<'logs' | 'database' | 'performance'>('logs');
  const [logLevel, setLogLevel] = useState<'all' | 'error' | 'warning' | 'info'>('all');

  // ダミーのログデータ
  const logs = [
    { id: 1, level: 'error', message: 'Failed to connect to database', timestamp: '2024-03-15 10:30:45' },
    { id: 2, level: 'warning', message: 'High memory usage detected', timestamp: '2024-03-15 10:29:30' },
    { id: 3, level: 'info', message: 'User login successful', timestamp: '2024-03-15 10:28:15' },
  ];

  // ダミーのパフォーマンスデータ
  const performanceMetrics = {
    cpu: 45,
    memory: 68,
    requests: 120,
    responseTime: 250,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">北上尾歯科 シフト管理（開発者）</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {/* TODO: ログアウト処理 */}}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* タブナビゲーション */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('logs')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'logs'
                ? 'bg-[#48d1cc] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Terminal size={20} />
            <span>システムログ</span>
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'database'
                ? 'bg-[#48d1cc] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Database size={20} />
            <span>データベース</span>
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'performance'
                ? 'bg-[#48d1cc] text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Activity size={20} />
            <span>パフォーマンス</span>
          </button>
        </div>

        {/* システムログ */}
        {activeTab === 'logs' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">システムログ</h2>
                <div className="flex items-center space-x-4">
                  <select
                    value={logLevel}
                    onChange={(e) => setLogLevel(e.target.value as any)}
                    className="rounded-md border-gray-300 shadow-sm focus:border-[#48d1cc] focus:ring focus:ring-[#48d1cc] focus:ring-opacity-50"
                  >
                    <option value="all">全てのログ</option>
                    <option value="error">エラーのみ</option>
                    <option value="warning">警告以上</option>
                    <option value="info">情報以上</option>
                  </select>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                    <RefreshCw size={20} />
                    <span>更新</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      タイムスタンプ
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      レベル
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      メッセージ
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            log.level === 'error'
                              ? 'bg-red-100 text-red-800'
                              : log.level === 'warning'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {log.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {log.message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* データベース */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">データベース情報</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-2">接続情報</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <pre className="text-sm text-gray-700">
                      {JSON.stringify({
                        host: 'db.supabase.co',
                        port: 5432,
                        database: 'shift_management',
                        user: '********',
                        ssl: true
                      }, null, 2)}
                    </pre>
                  </div>
                </div>
                <div>
                  <h3 className="text-md font-medium text-gray-900 mb-2">テーブル一覧</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="space-y-2">
                      <li className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">users</span>
                        <span className="text-xs text-gray-500">3 records</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">shift_submissions</span>
                        <span className="text-xs text-gray-500">15 records</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">shift_dates</span>
                        <span className="text-xs text-gray-500">45 records</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">settings</span>
                        <span className="text-xs text-gray-500">4 records</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* パフォーマンス */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">システムパフォーマンス</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CPU使用率 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">CPU使用率</span>
                    <span className="text-sm text-gray-500">{performanceMetrics.cpu}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-[#48d1cc] h-2.5 rounded-full"
                      style={{ width: `${performanceMetrics.cpu}%` }}
                    ></div>
                  </div>
                </div>

                {/* メモリ使用率 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">メモリ使用率</span>
                    <span className="text-sm text-gray-500">{performanceMetrics.memory}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-[#48d1cc] h-2.5 rounded-full"
                      style={{ width: `${performanceMetrics.memory}%` }}
                    ></div>
                  </div>
                </div>

                {/* リクエスト数 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">リクエスト数 / 分</span>
                    <span className="text-sm text-gray-500">{performanceMetrics.requests}</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">
                    {performanceMetrics.requests}
                  </div>
                </div>

                {/* レスポンスタイム */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">平均レスポンスタイム</span>
                    <span className="text-sm text-gray-500">{performanceMetrics.responseTime}ms</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">
                    {performanceMetrics.responseTime}ms
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}