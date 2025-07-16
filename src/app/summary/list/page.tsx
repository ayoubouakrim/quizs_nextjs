"use client";

import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, FileText, Globe, Eye, Edit, Trash2, Plus, MoreVertical, Bookmark, Clock, TrendingUp, Star, Download, Share2, Archive } from 'lucide-react';
import { SummaryService } from '@/services/SummaryService';
import { Summary } from '@/model/Summary';
import NavBar from '@/components/layout/navBar';
import Link from 'next/link';

const SummariesList = () => {
  const [loading, setLoading] = useState(true);
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [filteredSummaries, setFilteredSummaries] = useState<Summary[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLength, setFilterLength] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSummaries, setSelectedSummaries] = useState([]);

  // Enhanced mock data with more realistic content
  const fetchSummaries = async () => {
    try {
      setLoading(true);
      const summaryService = new SummaryService();
      const data = await summaryService.getAllSummaries();
      setSummaries(data);
      setFilteredSummaries(data);
    } catch (error) {
      console.error("Error fetching summaries:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchSummaries();
  }, []);

  useEffect(() => {
    let filtered = summaries.filter(summary => {
      const matchesSearch = summary.libelle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        summary.focusArea.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || summary.summaryType === filterType;
      const matchesLength = filterLength === 'all' || summary.summaryLength === filterLength;

      return matchesSearch && matchesType && matchesLength;
    });

    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredSummaries(filtered);
  }, [summaries, searchTerm, filterType, filterLength, sortBy, sortOrder]);

  const getTypeConfig = (type: string) => {
    const configs = {
      business: {
        color: 'bg-gradient-to-r from-blue-500 to-blue-600',
        textColor: 'text-white',
        icon: <TrendingUp className="w-3 h-3" />
      },
      academic: {
        color: 'bg-gradient-to-r from-purple-500 to-purple-600',
        textColor: 'text-white',
        icon: <Star className="w-3 h-3" />
      },
      technical: {
        color: 'bg-gradient-to-r from-green-500 to-green-600',
        textColor: 'text-white',
        icon: <FileText className="w-3 h-3" />
      },
      general: {
        color: 'bg-gradient-to-r from-gray-500 to-gray-600',
        textColor: 'text-white',
        icon: <Globe className="w-3 h-3" />
      }
    };
    return configs[type] || configs.general;
  };

  const getLengthConfig = (length: string) => {
    const configs = {
      brief: { color: 'bg-emerald-50 border-emerald-200', textColor: 'text-emerald-700' },
      medium: { color: 'bg-amber-50 border-amber-200', textColor: 'text-amber-700' },
      detailed: { color: 'bg-rose-50 border-rose-200', textColor: 'text-rose-700' }
    };
    return configs[length] || configs.brief;
  };

  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now - new Date(date));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const toggleBookmark = (id) => {
    setSummaries(prev => prev.map(summary =>
      summary.id === id ? { ...summary, isBookmarked: !summary.isBookmarked } : summary
    ));
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500">Loading</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <NavBar />
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-gray-600  to-blue-300 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white ">AI Summaries</h1>
              <p className="text-blue-300 text-lg">Intelligent content analysis at your fingertips</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-200 border border-white/30">
                <Archive className="w-5 h-5 inline mr-2" />
                Archive
              </button>
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg font-medium">
                <Plus className="w-5 h-5 inline mr-2" />
                Create Summary
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Summaries"
            value={summaries.length}
            icon={<FileText className="w-6 h-6 text-white" />}
            color="bg-gradient-to-r from-blue-500 to-blue-600"
          />
          <StatCard
            title="This Month"
            value={summaries.filter(s => new Date(s.createdAt).getMonth() === new Date().getMonth()).length}
            icon={<Calendar className="w-6 h-6 text-white" />}
            color="bg-gradient-to-r from-green-500 to-green-600"
          />
          <StatCard
            title="Bookmarked"
            value={summaries.filter(s => s.isBookmarked).length}
            icon={<Bookmark className="w-6 h-6 text-white" />}
            color="bg-gradient-to-r from-purple-500 to-purple-600"
          />
          <StatCard
            title="Total Words"
            value={summaries.reduce((acc, s) => acc + s.wordCount, 0).toLocaleString()}
            icon={<TrendingUp className="w-6 h-6 text-white" />}
            color="bg-gradient-to-r from-pink-500 to-pink-600"
          />
        </div>

        {/* Enhanced Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search summaries, tags, or focus areas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 rounded-xl border transition-all duration-200 ${showFilters ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <Filter className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">View:</span>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <div className="w-4 h-4 flex flex-col gap-0.5">
                  <div className="bg-current h-0.5 rounded-sm"></div>
                  <div className="bg-current h-0.5 rounded-sm"></div>
                  <div className="bg-current h-0.5 rounded-sm"></div>
                </div>
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
              >
                <option value="all">All Types</option>
                <option value="business">Business</option>
                <option value="academic">Academic</option>
                <option value="technical">Technical</option>
                <option value="general">General</option>
              </select>

              <select
                value={filterLength}
                onChange={(e) => setFilterLength(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
              >
                <option value="all">All Lengths</option>
                <option value="brief">Brief</option>
                <option value="medium">Medium</option>
                <option value="detailed">Detailed</option>
              </select>

              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
              >
                <option value="createdAt-desc">Newest First</option>
                <option value="createdAt-asc">Oldest First</option>
                <option value="libelle-asc">Title A-Z</option>
                <option value="libelle-desc">Title Z-A</option>
              </select>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            <span className="font-medium text-gray-900">{filteredSummaries.length}</span> of {summaries.length} summaries
          </p>
          {selectedSummaries.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{selectedSummaries.length} selected</span>
              <button className="text-sm text-indigo-600 hover:text-indigo-700">Delete</button>
            </div>
          )}
        </div>

        {/* Enhanced Summaries Display */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredSummaries.map((summary) => {
            const typeConfig = getTypeConfig(summary.summaryType);
            const lengthConfig = getLengthConfig(summary.summaryLength);

            return (
              <div key={summary.id} className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group ${viewMode === 'list' ? 'flex items-center p-6' : 'p-6'}`}>
                {/* Card Header */}
                <div className={`${viewMode === 'list' ? 'flex-1' : 'mb-4'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className={`font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors ${viewMode === 'list' ? 'text-lg' : 'text-lg mb-2'} line-clamp-2`}>
                        {summary.libelle}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {summary.readTime} min read
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(summary.createdAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => toggleBookmark(summary.id)}
                        className={`p-2 rounded-lg transition-all duration-200 ${summary.isBookmarked
                            ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                            : 'text-gray-400 hover:text-amber-500 hover:bg-amber-50'
                          }`}
                      >
                        <Bookmark className={`w-4 h-4 ${summary.isBookmarked ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-all duration-200">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Enhanced Tags and Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${typeConfig.color} ${typeConfig.textColor} flex items-center gap-1`}>
                      {typeConfig.icon}
                      {summary.summaryType}
                    </span>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${lengthConfig.color} ${lengthConfig.textColor}`}>
                      {summary.summaryLength}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {summary.language.toUpperCase()}
                    </span>
                  </div>

                  {/* Focus Area */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    <span className="font-medium text-gray-800">Focus:</span> {summary.focusArea}
                  </p>



                </div>

                {/* Enhanced Actions */}
                <div className={`${viewMode === 'list' ? 'flex items-center gap-2' : 'flex items-center justify-between pt-4 border-t border-gray-100'}`}>
                  <div className="flex items-center gap-1">
                    <Link href={`/summary/${summary.id}`}>
                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200">
                      <Eye className="w-4 h-4" />
                    </button>
                    </Link>
                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {/*
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">{summary.wordCount.toLocaleString()}</span> words
                  </div> */}
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Empty State */}
        {filteredSummaries.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No summaries found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchTerm || filterType !== 'all' || filterLength !== 'all'
                ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
                : 'Create your first AI-powered summary to get started with intelligent content analysis.'
              }
            </p>
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg">
              <Plus className="w-5 h-5 inline mr-2" />
              Create Your First Summary
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummariesList;