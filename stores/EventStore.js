import { defineStore } from "pinia";
import { AlbumService } from '../services/AlbumService'

export const useEventStore = defineStore("eventStore", {
    state: () => ({
        listForUser: [],
    }),

    actions: {
        async fetchForUser() {
            const res = await useAuthFetch('event/', 'GET');
            this.listForUser = res;
        },

        async createEventWithAlbums(data) {
            try {
                console.log("🚀 ~ createEventWithAlbums ~ data:", data);
                const newEvent = {
                    name: data.event.name,
                    startedAt: data.event.startedAt,
                    endedAt: data.event.endedAt,
                    description: data.event.description
                };
                // Création de l'événement
                const eventResponse = await useAuthFetch('event/', 'POST', newEvent);

                // Création de l'album associé
                if (data.pictures && data.pictures.length > 0) {
                    const albumData = {
                        album: {
                            name: data.album.name,
                            startedAt: data.album.startedAt,
                            endedAt: data.album.endedAt,
                            eventId: eventResponse.id
                        },
                        pictures: data.pictures
                    };
                    await AlbumService.createAlbumWithPictures(albumData);
                }

                return eventResponse;
            } catch (error) {
                console.error('Erreur lors de la création de l\'événement:', error);
                throw error;
            }
        },

        async getEventDetails(eventId) {
            return await useAuthFetch(`event/${eventId}`, 'GET');
        }
    }
});