import { createStore } from 'vuex';
import instance from '../axios';
import jwt_decode from "jwt-decode";

export default createStore({
  state: {
    user: "",
    login: "",
    logins: [],
    profile: "",
    supplier: "",
    suppliers: [],
    product: "",
    products: [],
    category: "",
    categories: [],
    stock: "",
    store: "",
    stores: "",
    modeAddProduct: "",
    cart: [],
    modeEditQuantity: "",
    modeConfirmCart: "",
    order: "",
    ordersPending: [],
    ordersValidated: [],
    modeEditProductQuantity: "",
    detailId: "",
    modeConfirmOrder: "",
    productsInOrder: [],
    sales: [],
    cartForIcon: [],
    modeBillOrder: "",
    modePurchase: "",
    ordersToBill: [],
    stocks: [],
    filtersProducts: {
      search: "",
      category: "",
      supplier: "",
      onSale: ""
    },
    filtersStocks: {
      search: "",
      category: "",
      supplier: "",
      onSale: ""
    },
    filtersCatalog: {
      search: "",
      category: ""
    },
    modeAddProductToOrder: false,
  },
  getters: {
    getCartForIcon: (state) => {
      return state.cartForIcon
    },
    getUser: (state) => {
      return state.user
    },
    getLogin: (state) => {
      return state.login
    },
    getLogins: (state) => {
      return state.logins
    },
    getProfile: (state) => {
      return state.profile
    },
    getSupplier: (state) => {
      return state.supplier
    },
    getSuppliers: (state) => {
      return state.suppliers
    },
    getProduct: (state) => {
      return state.product
    },
    getProducts: (state) => {
      return state.products
    },
    getCategory: (state) => {
      return state.category
    },
    getCategories: (state) => {
      return state.categories
    },
    getStock: (state) => {
      return state.stock
    },
    getStore: (state) => {
      return state.store
    },
    getStores: (state) => {
      return state.stores
    },
    getModeAddProduct: (state) => {
      return state.modeAddProduct
    },
    getCart: (state) => {
      return state.cart
    },
    getOrder: (state) => {
      return state.order
    },
    getOrdersPending: (state) => {
      return state.ordersPending
    },
    getOrdersValidated: (state) => {
      return state.ordersValidated
    },
    getProductsInOrder: (state) => {
      return state.productsInOrder
    },
    getSales: (state) => {
      return state.sales
    },
    getOrdersToBill: (state) => {
      return state.ordersToBill
    },
    getStocks: (state) => {
      return state.stocks
    },
    getModePurchase: (state) => {
      return state.modePurchase
    },
    getFiltersProducts: (state) => {
      return state.filtersProducts
    },
    getFiltersStocks: (state) => {
      return state.filtersStocks
    },
    getFiltersCatalog: (state) => {
      return state.filtersCatalog
    },
    getModeAddProductToOrder: (state) => {
      return state.modeAddProductToOrder
    }
  },
  mutations: {
    SET_CART_FOR_ICON: function (state, cartForIcon) {
      if(cartForIcon !== null) {
        state.cartForIcon = cartForIcon
      } else {
        state.cartForIcon = []
      }
      
    },
    LOG_OUT: function (state) {
        state.user = "",
        state.profile = "",
        localStorage.removeItem('token');
    },
    SET_USER: function (state, user) {
      state.user = user
    },
    SET_LOGIN: function (state, login) {
      state.login = login
    },
    SET_LOGINS: function (state, logins) {
      state.logins = logins
    },
    SET_PROFILE: function (state, profile) {
      state.profile = profile
    },
    SET_SUPPLIER: function (state, supplier) {
      state.supplier = supplier
    },
    SET_SUPPLIERS: function (state, suppliers) {
      state.suppliers = suppliers
    },
    SET_PRODUCT: function (state, product) {
      state.product = product
    },
    SET_PRODUCTS: function (state, products) {
      state.products = products
    },
    SET_CATEGORY: function (state, category) {
      state.category = category
    },
    SET_CATEGORIES: function (state, categories) {
      state.categories = categories
    },
    SET_STOCK: function (state, stock) {
      state.stock = stock
    },
    SET_STORE: function (state, store) {
      state.store = store
    },
    SET_STORES: function (state, stores) {
      state.stores = stores
    },
    RESET_CART: function (state) {
      state.cart = []
    },
    ADD_PRODUCT_TO_CART: function (state, product) {
      state.cart.push(product);
    },
    SET_ORDER: function (state, order) {
      state.order = order
    },
    RESET_ORDERS_PENDING: function (state) {
      state.ordersPending = []
    },
    SET_ORDERS_PENDING: function (state, order) {
      state.ordersPending.push(order)
      function SortTime(a, b) {
        let da = new Date(a.createdAt);
        let db = new Date(b.createdAt);
        return (db > da) ? 1 : -1;
      }
      state.ordersPending.sort(SortTime)
    },
    RESET_ORDERS_VALIDATED: function (state) {
      state.ordersValidated = []
    },
    SET_ORDERS_VALIDATED: function (state, order) {
      state.ordersValidated.push(order)
      function SortTime(a, b) {
        let da = new Date(a.createdAt);
        let db = new Date(b.createdAt);
        return (db > da) ? 1 : -1;
      }
      state.ordersValidated.sort(SortTime)
    },
    SET_PRODUCTS_IN_ORDER: function (state, product) {
      state.productsInOrder.push(product)
    },
    RESET_PRODUCTS_IN_ORDER: function (state) {
      state.productsInOrder = []
    },
    SET_SALES: function (state, sales) {
      state.sales = sales
    },
    SET_ORDERS_TO_BILL: function (state, orders) {
      state.ordersToBill = orders
    },
    SET_STOCKS: function (state, stocks) {
      state.stocks = stocks
    },
    SET_MODE_PURCHASE: function (state, modePurchase) {
      state.modePurchase = modePurchase
    },
    RESET_MODE_PURCHASE: function (state) {
      state.modePurchase = ""
    }
  },
  actions: {
    checkToken: () => {
      const token = localStorage.getItem("token");
      if (token) {
        const tokenLSV = jwt_decode(token);
        if(Date.now() >= tokenLSV.exp*1000) {
          return 'expired'
        } else {
          return 'valid'
        }
      }
    },
    login: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', userInfos)
          .then(function (response) {
            if (response.data.token) {
              commit('SET_USER', response.data);
              localStorage.setItem('token', response.data.token);
              resolve(response);
            }
          })
          .catch(function (error) {
            reject(error);
          })
      })
    },
    getProfile: ({ commit }) => {
      const token = localStorage.getItem("token");
      if(token) {
        const decodedToken = jwt_decode(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        return new Promise((resolve, reject) => {
          if (userId) {
            instance.get(`/user/${userId}`)
              .then(function (response) {
                commit('SET_PROFILE', response.data);
                if(response.data.role === 'store') {
                  instance.get(`/store/number/${response.data.roleNumber}`)
                    .then((res) => {
                      commit('SET_STORE', res.data);
                    })
                }
                resolve(response)
              })
              .catch(function (error) {
                reject(error)
              });
          }
        })
      } else {
        return 'no token'
      }
    },
    addSupplier: ({ commit }, supplier) => {
      return new Promise((resolve, reject) => {
        instance.post('/supplier/', supplier)
          .then(function (response) {
            commit('SET_SUPPLIER', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error);
          });
      })
    },
    editSupplier: ({ commit }, supplier) => {
      return new Promise((resolve, reject) => {
        instance.put(`/supplier/${supplier.id}`, supplier)
          .then(function (response) {
            commit('SET_SUPPLIER', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error);
          });
      })
    },
    getSuppliers: ({ commit }) => {
      return new Promise((resolve, reject) => {
        instance.get(`/supplier/`)
          .then(function (response) {
            commit('SET_SUPPLIERS', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error);
          });
      })
    },
    getSupplier: ({ commit }, supplierId) => {
      return new Promise((resolve, reject) => {
        instance.get(`/supplier/${supplierId}`)
          .then(function (response) {
            commit('SET_SUPPLIER', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error);
          });
      })
    },
    addCategory: ({ commit }, category) => {
      return new Promise((resolve, reject) => {
        instance.post('/category/', category)
          .then(function (response) {
            commit('SET_CATEGORY', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error);
          });
      })
    },
    editCategory: ({ commit }, category) => {
      return new Promise((resolve, reject) => {
        instance.put(`/category/${category.id}`, category)
          .then(function (response) {
            commit('SET_CATEGORY', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error);
          });
      })
    },
    getCategories: ({ commit }) => {
      return new Promise((resolve, reject) => {
        instance.get(`/category/`)
          .then(function (response) {
            commit('SET_CATEGORIES', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error);
          });
      })
    },
    getCategory: ({ commit }, categoryId) => {
      return new Promise((resolve, reject) => {
        instance.get(`/category/${categoryId}`)
          .then(function (response) {
            commit('SET_CATEGORY', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error);
          });
      })
    },
    addProduct: ({ commit }, product) => {
      return new Promise((resolve, reject) => {
        instance.post('/product/', product)
          .then(function (response) {
            commit('SET_PRODUCT', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error);
          });
      })
    },
    getProducts: ({ commit }) => {
      return new Promise((resolve, reject) => {
        instance.get(`/product/`)
          .then(function (response) {
            commit('SET_PRODUCTS', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error);
          });
      })
    },
    getProduct: ({ commit }, productId) => {
      return new Promise((resolve, reject) => {
        instance.get(`/product/${productId}`)
          .then(function (response) {
            commit('SET_PRODUCT', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error);
          });
      })
    },
    getStock: ({ commit }, stockId) => {
      return new Promise((resolve, reject) => {
        instance.get(`/stock/${stockId}`)
          .then(function (response) {
            commit('SET_STOCK', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error);
          });
        })
    },
    getCart: ({ commit }, cart) => {
      commit('RESET_CART')
      cart.forEach(product => {
        instance.get(`/product/${product.id}`)
          .then((response) => {
            commit('ADD_PRODUCT_TO_CART', response.data)
          })
          .catch(function (error) {
            console.log(error)
          });
      });
    },
    getOrder: ({ commit }, orderId) => {
      return new Promise((resolve, reject) => {
        instance.get(`/order/${orderId}`)
          .then(function (response) {
            commit('SET_ORDER', response.data)
            resolve(response)
            instance.get(`/store/${response.data.storeId}`)
            .then((res) => {
              commit('SET_STORE', res.data)
            })
          })
          .catch(function (error) {
            reject(error);
          });
      })
    },
    getOrdersPending: ({ commit }) => {
      commit('RESET_ORDERS_PENDING')
      instance.get(`/order/pending`)
        .then(function (response) {
          let orders = response.data
          orders.forEach(order => {
            instance.get(`/store/${order.storeId}`)
            .then((res) => {
              order.storeName = res.data.name
              commit('SET_ORDERS_PENDING', order)
            })
          })
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    getOrdersValidated: ({ commit }) => {
      commit('RESET_ORDERS_VALIDATED')
      instance.get(`/order/validated`)
        .then(function (response) {
          let orders = response.data
          orders.forEach(order => {
            instance.get(`/store/${order.storeId}`)
              .then((res) => {
                order.storeName = res.data.name
                commit('SET_ORDERS_VALIDATED', order)
              })
          })
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    checkStocks: ({ commit }, orderId) => {
      commit('RESET_PRODUCTS_IN_ORDER')
      instance.get(`/order/check-quantity/${orderId}`)
        .then((res) => {
          let quantity = res.data
          quantity.forEach(product => {
            instance.get(`/product/${product.id}`)
              .then((res) => {
                const index = quantity.findIndex(p => p.id === res.data.id)
                let product = res.data
                let stocks = 0
                product.stocks.forEach(stock => {
                  stocks += stock.quantity
                })
                quantity[index].stock = stocks
                commit('SET_PRODUCTS_IN_ORDER', quantity[index])
              })
          })
        })
    },
    getStores: ({ commit }) => {
      return new Promise((resolve, reject) => {
        instance.get(`/store/`)
          .then(function (response) {
            commit('SET_STORES', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error);
          });
      })
    },
    getStore: ({ commit }, storeId) => {
      instance.get(`/store/${storeId}`)
        .then(function (response) {
          commit('SET_STORE', response.data)
        })
        .catch(function (error) {
          console.log(error)
        });
    },
    getSales: ({ commit }) => {
      return new Promise((resolve, reject) => {
        instance.get(`/sale/`)
          .then(function (response) {
            commit('SET_SALES', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error);
          });
      })
    },
    getCartForIcon: ({ commit }) => {
      let cart = JSON.parse(localStorage.getItem('cart'))
      commit('SET_CART_FOR_ICON', cart)
    },
    getOrdersToBill: ({ commit }) => {
      return new Promise((resolve, reject) => {
        instance.get(`/order/to-bill`)
          .then(function (response) {
            commit('SET_ORDERS_TO_BILL', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error);
          });
      })
    },
    getStocks: ({ commit }) => {
      return new Promise((resolve, reject) => {
        instance.get(`/stock/`)
          .then(function (response) {
            commit('SET_STOCKS', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error);
          });
      })
    },
    getLogins: ({ commit }) => {
      return new Promise((resolve, reject) => {
        instance.get(`/user/`)
          .then(function (response) {
            commit('SET_LOGINS', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error);
          });
      })
    },
    getLogin: ({ commit }, loginId) => {
      return new Promise((resolve, reject) => {
        instance.get(`/user/${loginId}`)
          .then(function (response) {
            commit('SET_LOGIN', response.data)
            resolve(response)
          })
          .catch(function (error) {
            reject(error);
          });
      })
    },
  }
})
