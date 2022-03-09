import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import SalesHistory from '../views/SalesHistory.vue'
import Finance from '../views/Finance.vue'
import RecapCash from '../views/RecapCash.vue'
import Inventory from '../views/Inventory.vue'
import RawMaterials from '../views/raw_materials/RawMaterials.vue'
import Transactions from '../views/raw_materials/Transactions.vue'
import Reports from '@/views/reports/Reports.vue'
import PrintBill from '@/views/desktop_print/PrintBill.vue'
import PrintReceipt from '@/views/desktop_print/PrintReceipt.vue'
import PrintRecapCash from '@/views/desktop_print/PrintRecapCash.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/sales-history',
    name: 'SalesHistory',
    component: SalesHistory
  },
  {
    path: '/finance',
    name: 'Finance',
    component: Finance
  },
  {
    path: '/recap-cash',
    name: 'RecapCash',
    component: RecapCash
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: Inventory,
    children: [
      {
        path: '/raw-materials',
        name: 'RawMaterials',
        component: RawMaterials
      },
      {
        path: '/transactions',
        name: 'Transactions',
        component: Transactions
      }
    ]
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports
  },
  {
    path: '/print-bill',
    name: 'PrintBill',
    component: PrintBill
  },
  {
    path: '/print-receipt',
    name: 'PrintReceipt',
    component: PrintReceipt
  },
  {
    path: '/print-recap-cash',
    name: 'PrintRecapCash',
    component: PrintRecapCash
  }
  // {
  //   path: '/about',
  //   name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/About.vue')
  //   }
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
