<template>
  <div class="flex justify-center">
    <v-card class="self-center rounded-lg" elevated>
      <v-container>
        <v-row class="d-flex justify-center mb-2">
          <v-col cols="12" sm="10" md="10">
            <v-text-field v-model="albumName" label="Nom de l'album" rounded outlined clearable></v-text-field>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center mb-3 ">
          <v-col cols="12" sm="10" md="10">
            <v-text-field v-model="startDate" type="date" label="Date de début de l'évènement" rounded outlined
              clearable></v-text-field>
          </v-col>
          <v-col cols="12" sm="10" md="10">
            <v-text-field v-model="endDate" type="date" label="Date de début de l'évènement" rounded outlined
              clearable></v-text-field>
          </v-col>
        </v-row>
        <v-row class="d-flex justify-center mb-3">
          <v-col cols="12" sm="10" md="10">

            <v-file-input v-model="files" label="Met ton photo terla" counter filled prepend-icon="mdi-camera" multiple
              rounded outlined clearable :show-size="1000">
              <template v-slot:selection="{ index, text }">
                <v-chip v-if="index < 2" color="deep-grey accent-4" dark label small>
                  {{ text }}
                </v-chip>

                <span v-else-if="index === 2" class="text-overline grey--text text--darken-3 mx-2">
                  +{{ files.length - 2 }} Fichiers
                </span>
              </template>
            </v-file-input>
          </v-col>

        </v-row>
        <v-row class="flex justify-center mb-6">

          <v-btn rounded color="primary" dark @click="test"> Enregister </v-btn>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<style></style>
<script>
import { useAlbumStore } from '~~/stores/AlbumStore';
import { mapState, mapActions } from "pinia"; export default {
  data: () => ({
    files: [],
    albumName: "",
    startDate: "",
    endDate: "",
  }),
  methods: {
    ...mapActions(useAlbumStore, ["postNewAlbums"]),
    test() {
      const album = {
        name: this.albumName,
        startDate: this.startDate,
        endDate: this.endDate
      };
      this.postNewAlbums({
        album,
        pictures: this.files,
      });
    },
  },
};
</script>
