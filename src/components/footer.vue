<template>
    <v-footer padless class="font-weight-medium">
        <v-card flat tile color="#791d7c" class="lighten-1 white--text text-center flex">
            <v-card-text>
                <v-btn
                    class="mx-2"
                    href="https://www.facebook.com/PsykLaListe/"
                    target="_blank"
                    rounded
                >
                    <v-icon color="#4267b2">mdi-facebook</v-icon>
                </v-btn>
                <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" rounded>
                            <v-icon style="color:#35a241;">mdi-phone</v-icon>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-title class="headline grey lighten-2" primary-title>
                            Contactez-nous
                            <v-spacer></v-spacer>
                            <v-btn class="mx-2" icon @click="dialog = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-card-title>
                        <br />
                        <v-card-text class="subtitle-1 text-center">
                            Si vous préférez entendre nos voix douces, voici notre numéro:
                            <br />
                            <div
                                style="padding:10px; padding-top:10px"
                                class="title"
                            >+33 6 08 88 91 84</div>
                        </v-card-text>
                    </v-card>
                </v-dialog>
                <v-btn
                    class="mx-2"
                    href="https://www.instagram.com/psyk_laliste/"
                    target="_blank"
                    rounded
                >
                    <v-icon>$vuetify.icons.instaicon</v-icon>
                </v-btn>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
import instaIcon from "../components/instaIcon";
export default {
    components: {
        instaIcon
    },
    data() {
        return {
            dialog: false
        };
    }
};
</script>
