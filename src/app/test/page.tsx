'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Brain, 
  FileText, 
  PenTool, 
  Upload, 
  Home, 
  Settings, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Clock, 
  Download,
  Eye,
  Trash2,
  Plus,
  Search,
  Filter,
  MoreVertical,
  GraduationCap,
  BarChart3,
  Zap,
  Bell
} from 'lucide-react';

export default function EducationDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeDropdown, setActiveDropdown] = useState(null);

  const userName = "Alex Johnson";
  const userEmail = "alex@example.com";
  const currentTime = new Date().getHours();
  
  const getGreeting = () => {
    if (currentTime < 12) return "Good morning";
    if (currentTime < 18) return "Good afternoon";
    return "Good evening";
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const stats = [
    { icon: FileText, label: "Documents", value: "12", change: "+3", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Brain, label: "Quizzes", value: "48", change: "+12", color: "text-purple-600", bg: "bg-purple-50" },
    { icon: BookOpen, label: "Summaries", value: "24", change: "+8", color: "text-green-600", bg: "bg-green-50" },
    { icon: PenTool, label: "Exercises", value: "36", change: "+15", color: "text-orange-600", bg: "bg-orange-50" }
  ];

  const recentFiles = [
    { id: 1, name: "Introduction to Machine Learning.pdf", type: "PDF", size: "2.4 MB", date: "2 hours ago", status: "processed" },
    { id: 2, name: "Advanced JavaScript Concepts.docx", type: "DOCX", size: "1.8 MB", date: "1 day ago", status: "processing" },
    { id: 3, name: "Database Design Principles.txt", type: "TXT", size: "856 KB", date: "2 days ago", status: "processed" },
    { id: 4, name: "React Components Guide.md", type: "MD", size: "1.2 MB", date: "3 days ago", status: "processed" }
  ];

  const recentActivity = [
    { action: "Generated quiz", file: "Machine Learning.pdf", time: "30 min ago", type: "quiz" },
    { action: "Created summary", file: "JavaScript Concepts.docx", time: "2 hours ago", type: "summary" },
    { action: "Built exercises", file: "Database Design.txt", time: "5 hours ago", type: "exercise" },
    { action: "Uploaded file", file: "React Components.md", time: "1 day ago", type: "upload" }
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'files', label: 'My Files', icon: FileText },
    { id: 'quizzes', label: 'Quizzes', icon: Brain },
    { id: 'summaries', label: 'Summaries', icon: BookOpen },
    { id: 'exercises', label: 'Exercises', icon: PenTool },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Top Navigation Bar
  const TopNavbar = () => (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-2"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex-shrink-0 flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-gray-800 text-xl font-bold">EduAI</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {/* Dashboard */}
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center ${
                  activeTab === 'dashboard' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <BarChart3 className="h-4 w-4 mr-1" />
                Dashboard
              </button>

              {/* AI Tools Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('aitools')}
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center"
                >
                  <Brain className="h-4 w-4 mr-1" />
                  AI Tools
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDropdown === 'aitools' && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <button 
                        onClick={() => { setActiveTab('quizzes'); setActiveDropdown(null); }}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 w-full text-left"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Quiz Generator
                      </button>
                      <button 
                        onClick={() => { setActiveTab('summaries'); setActiveDropdown(null); }}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 w-full text-left"
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Summarizer
                      </button>
                      <button 
                        onClick={() => { setActiveTab('exercises'); setActiveDropdown(null); }}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 w-full text-left"
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Exercise Builder
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload */}
              <button
                onClick={() => setActiveTab('upload')}
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center"
              >
                <Upload className="h-4 w-4 mr-1" />
                Upload
              </button>

              {/* Library */}
              <button
                onClick={() => setActiveTab('files')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center ${
                  activeTab === 'files' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <BookOpen className="h-4 w-4 mr-1" />
                Library
              </button>
            </div>
          </div>

          {/* Right side - User menu */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {/* Notifications */}
              <button className="bg-gray-100 p-2 rounded-full text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200">
                <span className="sr-only">View notifications</span>
                <Bell className="h-5 w-5" />
              </button>

              {/* Profile dropdown */}
              <div className="ml-3 relative">
                <button
                  onClick={() => toggleDropdown('profile')}
                  className="bg-gray-100 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:bg-gray-200"
                >
                  <span className="sr-only">Open user menu</span>
                  <User className="h-8 w-8 text-gray-600 p-1" />
                </button>
                {activeDropdown === 'profile' && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 w-full text-left">
                        <User className="h-4 w-4 mr-2" />
                        Your Profile
                      </button>
                      <button 
                        onClick={() => { setActiveTab('settings'); setActiveDropdown(null); }}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 w-full text-left"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </button>
                      <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 w-full text-left">
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => toggleDropdown('mobile')}
              className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {activeDropdown === 'mobile' ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {activeDropdown === 'mobile' && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            <button
              onClick={() => { setActiveTab('dashboard'); setActiveDropdown(null); }}
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium flex items-center w-full text-left"
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Dashboard
            </button>
            
            {/* Mobile AI Tools */}
            <div className="space-y-1">
              <div className="text-gray-700 px-3 py-2 text-base font-medium flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                AI Tools
              </div>
              <div className="pl-6 space-y-1">
                <button 
                  onClick={() => { setActiveTab('quizzes'); setActiveDropdown(null); }}
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-sm font-medium flex items-center w-full text-left"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Quiz Generator
                </button>
                <button 
                  onClick={() => { setActiveTab('summaries'); setActiveDropdown(null); }}
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-sm font-medium flex items-center w-full text-left"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Summarizer
                </button>
                <button 
                  onClick={() => { setActiveTab('exercises'); setActiveDropdown(null); }}
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-sm font-medium flex items-center w-full text-left"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Exercise Builder
                </button>
              </div>
            </div>

            <button
              onClick={() => { setActiveTab('upload'); setActiveDropdown(null); }}
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium flex items-center w-full text-left"
            >
              <Upload className="h-5 w-5 mr-2" />
              Upload
            </button>
            
            <button
              onClick={() => { setActiveTab('files'); setActiveDropdown(null); }}
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium flex items-center w-full text-left"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Library
            </button>
          </div>
          
          {/* Mobile user menu */}
          <div className="pt-4 pb-3 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <User className="h-10 w-10 text-gray-600 bg-gray-200 rounded-full p-2" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{userName}</div>
                <div className="text-sm font-medium text-gray-500">{userEmail}</div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <button className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium flex items-center w-full text-left">
                <User className="h-5 w-5 mr-2" />
                Your Profile
              </button>
              <button 
                onClick={() => { setActiveTab('settings'); setActiveDropdown(null); }}
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium flex items-center w-full text-left"
              >
                <Settings className="h-5 w-5 mr-2" />
                Settings
              </button>
              <button className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium w-full text-left">
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out mt-16`}>
      <nav className="mt-6 px-3">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-3 py-2 mb-1 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <IconComponent className="h-5 w-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-full p-3 border-t border-gray-200">
        <div className="flex items-center px-3 py-2 mb-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-gray-600" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500">Free Plan</p>
          </div>
        </div>
        <button className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200">
          <LogOut className="h-4 w-4 mr-3" />
          Sign out
        </button>
      </div>
    </div>
  );

  const FileUploadArea = () => (
    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Upload your educational content</h3>
      <p className="text-gray-500 mb-4">Drag and drop files here, or click to select</p>
      <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
        <span className="px-2 py-1 bg-gray-100 rounded">PDF</span>
        <span className="px-2 py-1 bg-gray-100 rounded">DOCX</span>
        <span className="px-2 py-1 bg-gray-100 rounded">TXT</span>
        <span className="px-2 py-1 bg-gray-100 rounded">MD</span>
      </div>
    </div>
  );

  const DashboardContent = () => (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {getGreeting()}, {userName}! 👋
        </h1>
        <p className="text-gray-600 mb-4">
          Ready to transform your educational content with AI? Upload a file to get started.
        </p>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button 
            onClick={() => setActiveTab('quizzes')}
            className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-200 group"
          >
            <div className="p-2 bg-blue-100 rounded-lg mr-3 group-hover:bg-blue-200 transition-colors">
              <Brain className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900 text-sm">Generate Quiz</p>
              <p className="text-xs text-gray-500">Create questions</p>
            </div>
          </button>
          
          <button 
            onClick={() => setActiveTab('summaries')}
            className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-sm transition-all duration-200 group"
          >
            <div className="p-2 bg-green-100 rounded-lg mr-3 group-hover:bg-green-200 transition-colors">
              <BookOpen className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900 text-sm">Create Summary</p>
              <p className="text-xs text-gray-500">Extract insights</p>
            </div>
          </button>
          
          <button 
            onClick={() => setActiveTab('exercises')}
            className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-sm transition-all duration-200 group"
          >
            <div className="p-2 bg-orange-100 rounded-lg mr-3 group-hover:bg-orange-200 transition-colors">
              <PenTool className="h-4 w-4 text-orange-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900 text-sm">Build Exercises</p>
              <p className="text-xs text-gray-500">Practice activities</p>
            </div>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <IconComponent className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className="text-xs text-green-600 font-medium">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Upload Area */}
      <FileUploadArea />

      {/* Recent Files and Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Files */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Recent Files</h3>
          </div>
          <div className="p-4 space-y-3">
            {recentFiles.slice(0, 4).map((file) => (
              <div key={file.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    file.status === 'processed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {file.status}
                  </span>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-4 space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center p-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                  activity.type === 'quiz' ? 'bg-purple-100' :
                  activity.type === 'summary' ? 'bg-green-100' :
                  activity.type === 'exercise' ? 'bg-orange-100' : 'bg-blue-100'
                }`}>
                  {activity.type === 'quiz' && <Brain className="h-4 w-4 text-purple-600" />}
                  {activity.type === 'summary' && <BookOpen className="h-4 w-4 text-green-600" />}
                  {activity.type === 'exercise' && <PenTool className="h-4 w-4 text-orange-600" />}
                  {activity.type === 'upload' && <Upload className="h-4 w-4 text-blue-600" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.file} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const FilesContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Files</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Upload File
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search files..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="h-4 w-4" />
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modified</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentFiles.map((file) => (
                <tr key={file.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{file.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      file.status === 'processed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {file.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const QuizzesContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Quiz Generator</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
          <Brain className="h-4 w-4 mr-2" />
          Generate New Quiz
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Quiz from Document</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Document</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>Introduction to Machine Learning.pdf</option>
              <option>Advanced JavaScript Concepts.docx</option>
              <option>Database Design Principles.txt</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Questions</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
              <option>5 Questions</option>
              <option>10 Questions</option>
              <option>15 Questions</option>
              <option>20 Questions</option>
            </select>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Question Types</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" defaultChecked />
              <span className="ml-2 text-sm text-gray-700">Multiple Choice</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
              <span className="ml-2 text-sm text-gray-700">True/False</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
              <span className="ml-2 text-sm text-gray-700">Short Answer</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
              <span className="ml-2 text-sm text-gray-700">Essay</span>
            </label>
          </div>
        </div>
        <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">
          Generate Quiz
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Recent Quizzes</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            { title: "Machine Learning Basics Quiz", questions: 10, date: "2 hours ago", score: "85%" },
            { title: "JavaScript Advanced Concepts", questions: 15, date: "1 day ago", score: "92%" },
            { title: "Database Design Quiz", questions: 8, date: "3 days ago", score: "78%" }
          ].map((quiz, index) => (
            <div key={index} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{quiz.title}</h4>
                  <p className="text-sm text-gray-500">{quiz.questions} questions • {quiz.date}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-green-600">{quiz.score}</span>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SummariesContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Document Summarizer</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
          <BookOpen className="h-4 w-4 mr-2" />
          Create Summary
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Summary</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Document</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>Introduction to Machine Learning.pdf</option>
              <option>Advanced JavaScript Concepts.docx</option>
              <option>Database Design Principles.txt</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Summary Length</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option>Brief (1-2 paragraphs)</option>
              <option>Medium (3-5 paragraphs)</option>
              <option>Detailed (6+ paragraphs)</option>
            </select>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Focus Areas</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" defaultChecked />
              <span className="ml-2 text-sm text-gray-700">Key Concepts</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
              <span className="ml-2 text-sm text-gray-700">Examples</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
              <span className="ml-2 text-sm text-gray-700">Definitions</span>
            </label>
          </div>
        </div>
        <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
          Generate Summary
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Recent Summaries</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            { title: "Machine Learning Overview", pages: 45, date: "2 hours ago", type: "Brief" },
            { title: "JavaScript Concepts Summary", pages: 32, date: "1 day ago", type: "Medium" },
            { title: "Database Design Summary", pages: 28, date: "3 days ago", type: "Detailed" }
          ].map((summary, index) => (
            <div key={index} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{summary.title}</h4>
                  <p className="text-sm text-gray-500">{summary.pages} pages • {summary.type} • {summary.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Eye className="h-4 w-4 text-gray-400" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Download className="h-4 w-4 text-gray-400" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ExercisesContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Exercise Builder</h2>
        <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center">
          <Zap className="h-4 w-4 mr-2" />
          Build Exercise
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Practice Exercise</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Document</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <option>Introduction to Machine Learning.pdf</option>
              <option>Advanced JavaScript Concepts.docx</option>
              <option>Database Design Principles.txt</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Exercise Type</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
              <option>Problem Sets</option>
              <option>Case Studies</option>
              <option>Coding Challenges</option>
              <option>Discussion Questions</option>
            </select>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input type="radio" name="difficulty" className="text-orange-600 focus:ring-orange-500" defaultChecked />
              <span className="ml-2 text-sm text-gray-700">Beginner</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="difficulty" className="text-orange-600 focus:ring-orange-500" />
              <span className="ml-2 text-sm text-gray-700">Intermediate</span>
            </label>
            <label className="flex items-center">
              <input type="radio" name="difficulty" className="text-orange-600 focus:ring-orange-500" />
              <span className="ml-2 text-sm text-gray-700">Advanced</span>
            </label>
          </div>
        </div>
        <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium">
          Build Exercise
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Recent Exercises</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            { title: "ML Algorithm Practice", type: "Problem Sets", difficulty: "Intermediate", date: "2 hours ago" },
            { title: "JavaScript Debugging", type: "Coding Challenges", difficulty: "Advanced", date: "1 day ago" },
            { title: "Database Design Cases", type: "Case Studies", difficulty: "Beginner", date: "3 days ago" }
          ].map((exercise, index) => (
            <div key={index} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{exercise.title}</h4>
                  <p className="text-sm text-gray-500">{exercise.type} • {exercise.difficulty} • {exercise.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Eye className="h-4 w-4 text-gray-400" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Download className="h-4 w-4 text-gray-400" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SettingsContent = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
      
      <div className="grid gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input type="text" value={userName} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" value={userEmail} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Preferences</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default Quiz Length</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>10 Questions</option>
                <option>15 Questions</option>
                <option>20 Questions</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Summary Style</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Concise</option>
                <option>Detailed</option>
                <option>Bullet Points</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
          <div className="space-y-3">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
              <span className="ml-3 text-sm text-gray-700">Email notifications for completed processing</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-3 text-sm text-gray-700">Weekly summary reports</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
              <span className="ml-3 text-sm text-gray-700">New feature announcements</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'files':
        return <FilesContent />;
      case 'quizzes':
        return <QuizzesContent />;
      case 'summaries':
        return <SummariesContent />;
      case 'exercises':
        return <ExercisesContent />;
      case 'settings':
        return <SettingsContent />;
      case 'upload':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Upload Files</h2>
            <FileUploadArea />
          </div>
        );
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" onClick={() => setActiveDropdown(null)}>
      <TopNavbar />
      <Sidebar />
      
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="lg:ml-64 pt-4">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}