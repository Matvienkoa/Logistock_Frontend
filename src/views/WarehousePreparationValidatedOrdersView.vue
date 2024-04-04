<template>
<div v-if="isLoading" id="spinner" class="lds-ring">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>
<Header :title="'Commandes'"/>
    <div class="back-head">
        <router-link to="/warehouse_preparation" class="back-button">Retour</router-link>
    </div>
    <div class="page">
        <input @change="updateOrders()" v-model="month" type="month" id="input-month" class="date-input">
        <div v-if="orders.length <= 0" class="no-ordersValidated">
            Pas de commande validée pour le mois sélectionné
        </div>
        <router-link class="prepa-orders" v-for="order in orders" :key="order.id" :to="{name: 'warehouse_preparation_validated_order', params: {id: order.id}}">
            <div class="prepa-orders-infos">
                <p>Le : <span class="bold">{{moment(order.createdAt).format('L')}}</span></p>
                <p>N° : <span class="bold">{{order.id}}</span></p>
                <p>Mode de livraison : <span class="bold">{{order.delivery}}</span></p>
            </div>
            <div class="prepa-orders-infos">
                <p>De : {{order.storeName}}</p>
                <p v-if="order.billed === 'yes'" class="billed">Facturée</p>
                <p v-if="order.billed === 'no'" class="no-billed">A facturer</p>
            </div>
        </router-link>
    </div>
    <div class="bottom"></div>
<Footer/>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/FooterWarehouse.vue'
import { mapGetters } from 'vuex';
import instance from '@/axios';
let moment = require('moment');
moment.locale('fr');

export default {
    name: 'warehouse_preparation_validated_orders',
    components: {
        Header,
        Footer,
    },
    data() {
        return {
            moment: moment,
            orders: [],
            month: moment(new Date()).format('yyyy-MM'),
            isLoading: false
        }
    },
    computed: {
      ...mapGetters(['getOrdersValidated'])
    },
    methods: {
        updateOrders() {
            this.isLoading = true;
            instance.post(`/order/validated/`, { date: moment(this.month).format() })
            .then((res) => {
                let promises = res.data.map(order => {
                    return instance.get(`/store/${order.storeId}`)
                        .then((res) => {
                            return { ...order, storeName: res.data.name };
                        });
                });
                Promise.all(promises).then(ordersWithStoreName => {
                    this.orders = ordersWithStoreName;
                    this.isLoading = false;
                });
            })
        }
    },
    created: function () {
        this.isLoading = true;
        this.$store.dispatch('checkToken')
        .then((res) => {
            if(res === 'expired') {
            this.$router.push('/')
            }
        })
        this.$store.dispatch('getProfile')
        .then((res) => {
            if(res.data) {
            if(res.data.role !== 'warehouse') {
                this.$router.push('/store_home')
            }
            } else {
            this.$router.push('/')
            }
        })
        instance.post(`/order/validated/`, {
          date: new Date()
        })
        .then((res) => {
            let promises = res.data.map(order => {
                return instance.get(`/store/${order.storeId}`)
                    .then((res) => {
                        return { ...order, storeName: res.data.name };
                    });
            });
            Promise.all(promises).then(ordersWithStoreName => {
                this.orders = ordersWithStoreName;
                this.isLoading = false;
            });
        })
    },
}
</script>

<style scoped>
.page{
  flex-direction: column;
  padding-top: 50px;
}
.date-input{
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    font-size: 1.2em;
    height: 30px;
    border-radius: 8px;
    border: none;
    padding: 4px 10px;
    margin-bottom: 30px;
}
.date-input::-webkit-calendar-picker-indicator{
    background-color: transparent;
    cursor: pointer;
}
.no-ordersPending{
    margin-top: 30px;
}
.no-billed{
    align-self: flex-end;
    color: #ea510b;
    margin-top: 5px;
    font-weight: 600;
}
.billed{
    align-self: flex-end;
    color: rgb(19, 185, 19);
    margin-top: 5px;
    font-weight: 600;
}

@media (max-width: 600px) {
    .prepa-orders{
        flex-direction: column;
        align-items: flex-start;
    }
    .no-billed, .billed{
        align-self: unset;
    }
}
</style>