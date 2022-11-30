import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'

// ============== WAREHOUSE ==============
import WarehouseHome from '../views/WarehouseHomeView'
// Warehouse stocks
import WarehouseStock from '../views/WarehouseStockView'
import WarehouseSuppliers from '../views/WarehouseSuppliersView'
import WarehouseSupplier from '../views/WarehouseSupplierView'
import WarehouseAddSupplier from '../views/WarehouseAddSupplierView'
import WarehouseEditSupplier from '../views/WarehouseEditSupplierView'
import WarehouseProducts from '../views/WarehouseProductsView'
import WarehouseProduct from '../views/WarehouseProductView'
import WarehouseAddProduct from '../views/WarehouseAddProductView'
import WarehouseEditProduct from '../views/WarehouseEditProductView'
import WarehouseInventory from '../views/WarehouseInventoryView'
import WarehouseInventoryProduct from '../views/WarehouseInventoryProductView'
import WarehouseInventoryAddStockProduct from '../views/WarehouseInventoryAddStockProductView'
import WarehouseInventoryEditStockProduct from '../views/WarehouseInventoryEditStockProductView'
// Warehouse preparation
import WarehousePreparation from '../views/WarehousePreparationView'
import WarehousePreparationNewOrders from '../views/WarehousePreparationNewOrdersView'
import WarehousePreparationNewOrder from '../views/WarehousePreparationNewOrderView'
import WarehousePreparationValidatedOrders from '../views/WarehousePreparationValidatedOrdersView'
import WarehousePreparationValidatedOrder from '../views/WarehousePreparationValidatedOrderView'
// Warehouse admin
import WarehouseAdmin from '../views/WarehouseAdminView'
import WarehouseAdminStores from '../views/WarehouseAdminStoresView'
import WarehouseAdminStore from '../views/WarehouseAdminStoreView'
import WarehouseAdminSales from '../views/WarehouseAdminSalesView'
import WarehouseAdminStocks from '../views/WarehouseAdminStocksView'


// ============== STORE ==============
import StoreHome from '../views/StoreHomeView'
// Store products
import StoreProducts from '../views/StoreProductsView'
import StoreProduct from '../views/StoreProductView'
import StoreCart from '../views/StoreCartView'
import StoreOrderSuccess from '../views/StoreOrderSuccessView'
// Store orders
import StoreOrders from '../views/StoreOrdersView'
import StoreOrder from '../views/StoreOrderView'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
// ============== WAREHOUSE ==============
  {
    path: '/warehouse_home',
    name: 'warehouse_home',
    component: WarehouseHome
  },
  // ---------- Warehouse stocks ----------
  {
    path: '/warehouse_stock',
    name: 'warehouse_stock',
    component: WarehouseStock
  },
  // Suppliers
  {
    path: '/warehouse_suppliers',
    name: 'warehouse_suppliers',
    component: WarehouseSuppliers
  },
  {
    path: '/warehouse_supplier/:id',
    name: 'warehouse_supplier',
    component: WarehouseSupplier
  },
  {
    path: '/warehouse_add_supplier',
    name: 'warehouse_add_supplier',
    component: WarehouseAddSupplier
  },
  {
    path: '/warehouse_edit_supplier/:id',
    name: 'warehouse_edit_supplier',
    component: WarehouseEditSupplier
  },
  // Products
  {
    path: '/warehouse_products',
    name: 'warehouse_products',
    component: WarehouseProducts
  },
  {
    path: '/warehouse_product/:id',
    name: 'warehouse_product',
    component: WarehouseProduct
  },
  {
    path: '/warehouse_add_product',
    name: 'warehouse_add_product',
    component: WarehouseAddProduct
  },
  {
    path: '/warehouse_edit_product/:id',
    name: 'warehouse_edit_product',
    component: WarehouseEditProduct
  },
  // Inventory
  {
    path: '/warehouse_inventory',
    name: 'warehouse_inventory',
    component: WarehouseInventory
  },
  {
    path: '/warehouse_inventory_product/:id',
    name: 'warehouse_inventory_product',
    component: WarehouseInventoryProduct
  },
  {
    path: '/warehouse_inventory_add_stock_product/:id',
    name: 'warehouse_inventory_add_stock_product',
    component: WarehouseInventoryAddStockProduct
  },
  {
    path: '/warehouse_inventory_edit_stock_product/:id',
    name: 'warehouse_inventory_edit_stock_product',
    component: WarehouseInventoryEditStockProduct
  },

  // ---------- Warehouse Preparation ----------
  {
    path: '/warehouse_preparation',
    name: 'warehouse_preparation',
    component: WarehousePreparation
  },
  // New Orders
  {
    path: '/warehouse_preparation_new_orders',
    name: 'warehouse_preparation_new_orders',
    component: WarehousePreparationNewOrders
  },
  {
    path: '/warehouse_preparation_new_order/:id',
    name: 'warehouse_preparation_new_order',
    component: WarehousePreparationNewOrder
  },
  // Validated Orders
  {
    path: '/warehouse_preparation_validated_orders',
    name: 'warehouse_preparation_validated_orders',
    component: WarehousePreparationValidatedOrders
  },
  {
    path: '/warehouse_preparation_validated_order/:id',
    name: 'warehouse_preparation_validated_order',
    component: WarehousePreparationValidatedOrder
  },
  // ---------- Warehouse Admin ----------
  {
    path: '/warehouse_admin',
    name: 'warehouse_admin',
    component: WarehouseAdmin
  },
  // Stores
  {
    path: '/warehouse_admin_stores',
    name: 'warehouse_admin_stores',
    component: WarehouseAdminStores
  },
  {
    path: '/warehouse_admin_store/:id',
    name: 'warehouse_admin_store',
    component: WarehouseAdminStore
  },
  // Sales
  {
    path: '/warehouse_admin_sales',
    name: 'warehouse_admin_sales',
    component: WarehouseAdminSales
  },
  // Stocks
  {
    path: '/warehouse_admin_stocks',
    name: 'warehouse_admin_stocks',
    component: WarehouseAdminStocks
  },
// ============== STORE ==============
  {
    path: '/store_home',
    name: 'store_home',
    component: StoreHome
  },
  // ---------- Store Products ----------
  {
    path: '/store_products',
    name: 'store_products',
    component: StoreProducts
  },
  {
    path: '/store_product/:id',
    name: 'store_product',
    component: StoreProduct
  },
  {
    path: '/store_cart',
    name: 'store_cart',
    component: StoreCart
  },
  {
    path: '/store_order_success',
    name: 'store_order_success',
    component: StoreOrderSuccess
  },
  // ---------- Store Orders ----------
  {
    path: '/store_orders',
    name: 'store_orders',
    component: StoreOrders
  },
  {
    path: '/store_order/:id',
    name: 'store_order',
    component: StoreOrder
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
