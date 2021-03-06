<template>
    <v-text-field v-if="!isLoaded" color="success" loading disabled></v-text-field>
    <v-content v-else id="mainContent">
        <v-container fluid style="padding-bottom: 200px">
            <v-alert
                id="#alert"
                v-if="orderSatus.display"
                :type="orderSatus.status"
            >{{this.orderSatus.details}}</v-alert>
            <v-row>
                <v-col cols="12" md="6">
                    <v-card class="mx-auto" color="#7DBF73">
                        <v-card-title>
                            <v-btn icon to="/shop" color="white">
                                <v-icon>mdi-arrow-left</v-icon>
                            </v-btn>
                            <v-spacer />
                            <v-tooltip right>
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        icon
                                        large
                                        target="_blank"
                                        v-on="on"
                                        @click="reset_cart"
                                        color="white"
                                    >
                                        <v-icon large>mdi-delete</v-icon>
                                    </v-btn>
                                </template>
                                <span>Vider le panier</span>
                            </v-tooltip>
                        </v-card-title>

                        <v-container>
                            <CartItem v-for="(product, i) in cart" :key="i" link :data="product" />
                        </v-container>
                    </v-card>
                </v-col>

                <v-col cols="12" md="6">
                    <v-card class="mx-auto" color="#7DBF73" dark max-width="1000">
                        <v-card-title>
                            <v-list-item-avatar color="grey darken-3">
                                <v-img
                                    v-if="user.data.photo"
                                    class="elevation-6"
                                    :src="user.data.photo"
                                ></v-img>
                                <v-icon v-else dark>mdi-account-circle</v-icon>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>{{user.data.displayName}}</v-list-item-title>
                            </v-list-item-content>
                            <v-spacer />
                            <span class="overline font-weight-regular">Informations</span>
                        </v-card-title>
                        <v-container>
                            <span class="overline font-weight-regular">Identité</span>
                            <v-list>
                                <v-list-item>
                                    <v-text-field
                                        style="padding-left: 10px"
                                        v-model="name"
                                        label="Prénom Nom"
                                        required
                                    ></v-text-field>
                                </v-list-item>
                            </v-list>
                        </v-container>
                        <v-container>
                            <span class="overline font-weight-regular">Nombre de personne</span>
                            <v-list>
                                <v-list-item>
                                    <v-slider
                                        v-model="slider"
                                        class="align-center"
                                        max="15"
                                        min="1"
                                        hide-details
                                    >
                                        <template v-slot:append>
                                            <span>{{slider}}</span>
                                        </template>
                                    </v-slider>
                                </v-list-item>
                            </v-list>
                        </v-container>
                        <v-container>
                            <span class="overline font-weight-regular">Numéro de télephone</span>
                            <v-list>
                                <v-list-item>
                                    <v-text-field
                                        style="padding-left: 10px"
                                        v-model="phoneNumber"
                                        label="Numéro de téléphone"
                                        required
                                    ></v-text-field>
                                </v-list-item>
                            </v-list>
                        </v-container>
                        <v-container>
                            <span class="overline font-weight-regular">Adresse</span>
                            <v-list>
                                <v-list-item>
                                    <v-text-field
                                        style="padding-left: 10px"
                                        v-model="address"
                                        label="Adresse postale"
                                        required
                                    ></v-text-field>
                                </v-list-item>
                                <v-list-item>
                                    <v-text-field
                                        style="padding-left: 10px"
                                        v-model="address_complement"
                                        label="Complément d'adresse"
                                        required
                                    ></v-text-field>
                                </v-list-item>
                                <v-list-item>
                                    <v-text-field
                                        style="padding-left: 10px"
                                        v-model="address_postal"
                                        label="Code postale"
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        style="padding-left: 10px"
                                        v-model="address_city"
                                        label="Ville"
                                        required
                                    ></v-text-field>
                                </v-list-item>
                            </v-list>
                        </v-container>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-btn
            large
            dark
            bottom
            fixed
            absolute
            left
            class="v-btn--example"
            color="#121040"
            @click="command"
        >
            <v-icon left>mdi-check</v-icon>Commander
        </v-btn>
    </v-content>
</template>

<style>
/* This is for documentation purposes and will not be needed in your application */
.v-btn--example {
    bottom: 0;
    margin: 0 0 10% 16px;
}
</style>

<script>
import { mapGetters, mapActions } from "vuex";
import CartItem from "../components/shop/cart_item";
import * as order_service from "../services/order";
import goTo from "vuetify/es5/services/goto";
import firebase from "firebase";

export default {
    components: {
        CartItem
    },
    computed: {
        ...mapGetters({
            cart: "getCart",
            category: "CategoryModule/getCategory",
            getOrder: "OrderModule/getOrder",
            user: "UserModule/getUser",
            getCanOrder: "OrderModule/getCanOrder"
        })
    },
    methods: {
        ...mapActions({
            reset_cart: "reset_cart",
            fetchCategory: "CategoryModule/fetchCategory",
            set_cart_id: "set_cart_id",
            passOrder: "OrderModule/passOrder",
            fetchOrder: "OrderModule/fetchOrder",
            fetchCanOrder: "OrderModule/fetchCanOrder",
        }),
        isPhoneNumber(number) {
            if (number.length != 10) return false;
            for (var i = 0; i < number.length; i++) {
                if (!(number[i] <= "9" && number[i] >= "0")) return false;
            }
            return true;
        },
        check_phone_number() {
            var number = this.phoneNumber;
            if (!number) {
                this.orderSatus.display = true;
                this.orderSatus.status = "error";
                this.orderSatus.details =
                    "Tu n'as pas renseigné ton numéro de téléphone. Tu ne peux donc pas commander.";
                return false;
            }
            if (!this.isPhoneNumber(number)) {
                this.orderSatus.display = true;
                this.orderSatus.status = "error";
                this.orderSatus.details =
                    "Numéro de téléphone non valide. Il doit être du type 0123456789";
                this.phoneNumber = "";
                return false;
            }
            return true;
        },
        check_address() {
            if (!this.address || !this.address_postal || !this.address_city) {
                this.orderSatus.display = true;
                this.orderSatus.status = "error";
                this.orderSatus.details = "Ton adresse n'est pas complète.";
                return false;
            }
            if (this.address_postal.length != 5) {
                this.orderSatus.display = true;
                this.orderSatus.status = "error";
                this.orderSatus.details =
                    "Code postale non valide. Il doit être du type '12345'";
                return false;
            }
            return true;
        },
        getDate() {
            var d = new Date();
            var r =
                d.getDate() +
                "/" +
                d.getMonth() +
                "/" +
                d.getFullYear() +
                " " +
                d.getHours() +
                ":" +
                d.getMinutes();
            return r;
        },
        navigate(route_name) {
            this.$router.push({ name: route_name });
        },
        command() {
            if (this.cart.length == 0) {
                this.orderSatus.display = true;
                this.orderSatus.status = "error";
                this.orderSatus.details = "Panier vide";
                goTo("#mainContent");
                return;
            }
            if (!this.name) {
                this.orderSatus.display = true;
                this.orderSatus.status = "error";
                this.orderSatus.details = "Champ Prénom Nom vide.";
                goTo("#mainContent");
                return;
            }
            // if (!this.check_phone_number()) return;
            if (!this.check_address()) return;

            var userr = {
                email : this.user.data.email,
                uid : this.user.data.uid,
                photo : this.user.data.photo,
                phoneNumber : this.user.data.phoneNumber,
                displayName : this.user.data.displayName
            }
            if (!userr.displayName)
                userr.displayName = this.name;
            if (!userr.phoneNumber)
                userr.phoneNumber = this.phoneNumber;

            var addr = {
                steetname: this.address,
                postcode: this.address_postal,
                complement: this.address_complement,
                city: this.address_city
            };
            var command = {
                id: null,
                content: order_service.format_cart(this.cart),
                user: userr,
                people_number: this.slider,
                address: addr,
                date: this.getDate(),
                status: 0
            };
            if (this.getCanOrder == false) {
                this.orderSatus.display = true;
                this.orderSatus.status = "error";
                this.orderSatus.details =
                    "Victime de son succès, PSYK n'accepte plus les commandes pour le moment.";
                goTo("#mainContent");
                return;
            }
            this.reset_cart();
            this.passOrder(command).then(() => {
                console.log("heo")
                this.navigate("Success");
                goTo("#mainContent");
                return;
            });
        }
    },
    data() {
        return {
            isLoaded: false,
            orderSatus: {
                display: false,
                status: "warning",
                details: ""
            },
            phoneNumber: "",
            address: "",
            address_postal: "",
            address_complement: "",
            address_city: "",
            name: "",
            slider: 0
        };
    },
    beforeMount() {
        this.phoneNumber = this.user.data.phoneNumber;
        this.name = this.user.data.displayName;
        this.fetchCanOrder().then(() => {
            this.isLoaded = true;
        })
    },
    props: {
        source: String
    }
};
</script>