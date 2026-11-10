'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Bell, Settings, Sparkles } from 'lucide-react';
import { OnboardingView } from '../components/onboarding/OnboardingView';
import { WeekCalendarStrip } from '../components/home/WeekCalendarStrip';
import { MetricCards } from '../components/home/MetricCards';
import { WeeklyProgressBar } from '../components/home/WeeklyProgressBar';
import { TaskList } from '../components/home/TaskList';
import { FloatingAddButton } from '../components/home/FloatingAddButton';
import { TaskModalContainer } from '../components/taskModal/TaskModalContainer';
import { SearchBar } from '../components/search/SearchBar';
import { SearchResultsList } from '../components/search/SearchResultsList';
import { useTasks } from '../hooks/useTasks';
import { useWeeklyMetrics } from '../hooks/useWeeklyMetrics';
import { useDebounce } from '../hooks/useDebounce';
import { ITask, ITaskInput } from '../types/ITask';
import { TaskStatusEnum } from '../enums/TaskStatusEnum';
import { formatDateKey } from '../utils/date/getWeekRange';
import { tasksApi } from '../apis/tasksApi';

export default function HomePage() {
  // Navigation states
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected date state (defaults to today)
  const todayStr = useMemo(() => formatDateKey(new Date()), []);
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [isViewingAll, setIsViewingAll] = useState<boolean>(false);
  const [activeStatusFilter, setActiveStatusFilter] = useState<TaskStatusEnum | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<ITask | null>(null);

  // Weekly metrics hook
  const { metrics, refreshMetrics } = useWeeklyMetrics();

  // Task filter calculation
  const taskFilter = useMemo(() => {
    if (isViewingAll) {
      return activeStatusFilter ? { status: activeStatusFilter } : {};
    }
    return activeStatusFilter
      ? { date: selectedDate, status: activeStatusFilter }
      : { date: selectedDate };
  }, [selectedDate, isViewingAll, activeStatusFilter]);

  // Main task state hook
  const {
    tasks,
    loading: tasksLoading,
    refreshTasks,
    toggleTaskStatus,
    addTask,
    editTask,
    removeTask,
  } = useTasks(taskFilter, () => {
    refreshMetrics();
  });

  // Search results hook
  const debouncedSearch = useDebounce(searchQuery, 300);
  const {
    tasks: searchResults,
    loading: searchLoading,
    refreshTasks: refreshSearch,
    toggleTaskStatus: toggleSearchTaskStatus,
    removeTask: removeSearchTask,
  } = useTasks(
    debouncedSearch ? { search: debouncedSearch } : { search: '__NONE__' },
    () => {
      refreshTasks();
      refreshMetrics();
    }
  );

  // Auto-seed demo tasks on first mount if task list is empty
  useEffect(() => {
    const initSeed = async () => {
      try {
        const existing = await tasksApi.getTasks({});
        if (existing.length === 0) {
          await tasksApi.seedDemoTasks();
          refreshTasks();
          refreshMetrics();
        }
      } catch (err) {
        console.error('Initial seed check error:', err);
      }
    };
    initSeed();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Handlers
  const handleOpenCreateModal = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task: ITask) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (values: ITaskInput) => {
    if (taskToEdit?._id) {
      await editTask(taskToEdit._id, values);
    } else {
      await addTask(values);
    }
    refreshMetrics();
  };

  const handleQuickSeed = async () => {
    await tasksApi.seedDemoTasks();
    refreshTasks();
    refreshMetrics();
  };

  // Screen 1: Onboarding
  if (!hasStarted) {
    return <OnboardingView onGetStarted={() => setHasStarted(true)} />;
  }

  // Screen 4: Search Mode
  if (isSearching) {
    return (
      <div className="flex-1 flex flex-col p-5 bg-white">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onBack={() => {
            setIsSearching(false);
            setSearchQuery('');
          }}
        />
        <SearchResultsList
          tasks={searchResults}
          loading={searchLoading}
          query={debouncedSearch}
          onToggleStatus={(task) => {
            toggleSearchTaskStatus(task);
            refreshTasks();
            refreshMetrics();
          }}
          onEdit={(task) => {
            handleOpenEditModal(task);
          }}
          onDelete={(id) => {
            removeSearchTask(id);
            refreshTasks();
            refreshMetrics();
          }}
        />
      </div>
    );
  }

  // Screen 2: Main Dashboard / Home Screen
  return (
    <div className="flex-1 flex flex-col p-5 bg-white relative overflow-y-auto">
      {/* Top App Bar with Icons */}
      <div className="flex items-center justify-between pt-1 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setHasStarted(false)}
            aria-label="Settings / Welcome"
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleQuickSeed}
            title="Reset / Seed Demo Tasks"
            className="p-2 text-gray-500 hover:text-[#5B36F4] hover:bg-[#F4F0FF] rounded-full transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <Sparkles className="w-4 h-4 text-[#5B36F4]" />
            <span className="text-[11px] text-[#5B36F4] hidden sm:inline">Reset Demo</span>
          </button>
          <button
            type="button"
            onClick={() => setIsSearching(true)}
            aria-label="Search"
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search Input Bar (Matching Figma Screen 2) */}
      <div
        onClick={() => setIsSearching(true)}
        className="relative flex items-center mb-3 bg-gray-50 hover:bg-gray-100/80 rounded-2xl p-3 border border-gray-100 cursor-pointer transition-colors"
      >
        <span className="text-sm text-gray-400 font-medium pl-1 flex-1">
          Search for a task
        </span>
        <Search className="w-4 h-4 text-gray-400 mr-1" />
      </div>

      {/* Week Calendar Strip (Monday - Sunday) */}
      <WeekCalendarStrip
        selectedDate={selectedDate}
        onSelectDate={(date) => {
          setSelectedDate(date);
          setIsViewingAll(false);
        }}
      />

      {/* Metric Cards (Completed & Pending) */}
      <MetricCards
        metrics={metrics}
        activeStatusFilter={activeStatusFilter}
        onSelectStatusFilter={setActiveStatusFilter}
      />

      {/* Weekly Progress Bar */}
      <WeeklyProgressBar percentage={metrics?.completionPercentage ?? 0} />

      {/* Task List */}
      <TaskList
        tasks={tasks}
        loading={tasksLoading}
        selectedDate={selectedDate}
        isViewingAll={isViewingAll}
        onToggleViewAll={() => setIsViewingAll(!isViewingAll)}
        onToggleStatus={toggleTaskStatus}
        onEdit={handleOpenEditModal}
        onDelete={removeTask}
      />

      {/* Floating Action "+" Button */}
      <FloatingAddButton onClick={handleOpenCreateModal} />

      {/* Screen 3: Add / Edit Task Modal */}
      <TaskModalContainer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskToEdit={taskToEdit}
        defaultDate={selectedDate}
        onSaveTask={handleSaveTask}
      />
    </div>
  );
}
