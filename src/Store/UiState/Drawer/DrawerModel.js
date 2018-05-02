export default {
  user: {},
  menuItems: [
    {
      name: 'settings',
      title: 'Settings',
      icon: 'setting',
      path: '/settings'
    },
    {
      name: 'user',
      title: 'User',
      icon: 'user',
      path: 'user',
      menuItems: [
        {
          name: 'user',
          title: 'Me',
          icon: 'user',
          path: '/user/me',
        }
      ]
    }
  ],
  show: false
}