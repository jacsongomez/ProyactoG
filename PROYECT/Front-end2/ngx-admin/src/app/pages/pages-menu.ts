import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'pie-chart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Usuarios',
    icon: 'person-outline',
    link: '/pages/usuarios/listarUsu',
  },
  {
    title: 'Roles',
    icon: 'people-outline',
    link: '/pages/roles/listarRol',
  },
  {
    title: 'Permisos',
    icon: 'lock-outline',
    link: '/pages/permisos/listarPermiso',
  },
  {
    title: 'Permisos-Rol',
    icon: 'settings-outline',
    link: '/pages/permiRol/listarPermiRol',
  },
  {
    title: 'Personas',
    icon: 'smiling-face-outline',
    link: '/pages/personas/listarPer',
  },
  {
    title: 'Consejos',
    icon: 'question-mark-circle-outline',
    link: '/pages/consejos/listarCons',
  },
  {
    title: 'Capacidades',
    icon: 'bulb-outline',
    link: '/pages/capacidades/listarCap',
  },
  {
    title: 'Programas',
    icon: 'book-open-outline',
    link: '/pages/programas/listarPro',
  },
  {
    title: 'Asignacion-Capacidad',
    icon: 'flash-outline',
    link: '/pages/asigCap/listarAsig',
  },
];
