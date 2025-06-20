import { defineStore } from 'pinia'

export type ThemeType = 'light' | 'dark' | 'red' | 'purple'

interface ThemeState {
  currentTheme: ThemeType
  isDarkMode: boolean
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    currentTheme: 'light',
    isDarkMode: true
  }),

  actions: {
    setTheme(theme: ThemeType) {
      this.currentTheme = theme
      this.isDarkMode = theme === 'dark'
      document.documentElement.setAttribute('data-theme', theme)

      // 保存主题设置到本地存储
      localStorage.setItem('theme', theme)
    },

    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      this.setTheme(this.isDarkMode ? 'dark' : 'light')
    },

    // 初始化主题
    initTheme() {
      if (this.currentTheme) {
        this.setTheme(this.currentTheme)
      }
    }
  },

  persist: {
    key: 'quick-theme-store'
  }
}) 