import { useAuthFetch } from '~/composables/useAuthFetch'

export const AlbumService = {
    async createNewAlbum(albumData) {
        try {
            const newAlbum = await useAuthFetch(
                "album/new",
                'POST',
                albumData
            )
            return newAlbum
        } catch (error) {
            console.error('Erreur lors de la création de l\'album:', error)
            throw error
        }
    },

    async uploadPictures(pictures, albumId) {
        try {
            const formData = new FormData()
            pictures.forEach(pic => {
                formData.append("pictures", pic)
            })

            const response = await useAuthFetch(
                `pictures/writeAndSavePictures?albumId=${albumId}`,
                'POST',
                formData
            )
            return response
        } catch (error) {
            console.error('Erreur lors du téléchargement des images:', error)
            throw error
        }
    },

    async createAlbumWithPictures(data, sharedGroups, toast) {
        try {
            const newAlbum = await this.createNewAlbum(data.album)
            useNotify(toast, 'success', 'Album créé', 'Album créé avec succès', 5000)
            const uploadedPictures = await this.uploadPictures(data.pictures, newAlbum.id)
            useNotify(toast, 'success', 'Images téléchargées', 'Images téléchargées avec succès', 5000)
            if (sharedGroups && sharedGroups.length > 0) {
                await AlbumService.shareAlbum(newAlbum.id, sharedGroups, toast)
                useNotify(toast, 'success', 'Album partagé', 'Album partagé avec succès', 5000)
            }
            return {
                album: newAlbum,
                pictures: uploadedPictures
            }
        } catch (error) {
            useNotify(toast, 'error', 'Erreur', 'Erreur lors de la création de l\'album avec images:', 5000)
            console.error('Erreur lors de la création de l\'album avec images:', error)
            throw error
        }
    },

    async shareAlbum(albumId, sharedGroups, toast) {
        try {
            const groupIds = sharedGroups.map(group => group.id).join(',')
            const response = await useAuthFetch(`album-sharing/share?albumId=${albumId}&groupIds=${groupIds}`)
            useNotify(toast, 'success', 'Album partagé', 'Album partagé avec succès', 5000)
            return response
        } catch (error) {
            useNotify(toast, 'error', 'Erreur', 'Erreur lors du partage de l\'album:', 5000)
            console.error('Erreur lors du partage de l\'album:', error)
            throw error
        }
    }
}
