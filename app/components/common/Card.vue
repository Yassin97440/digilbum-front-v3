<template>
    <v-card :class="[
        'relative overflow-hidden',
        'bg-transparent backdrop-blur-3xl',
        'shadow-md rounded-xl',
        'transform transition-all duration-500 text-white',
        hoverEffect ? 'hover:scale-105 hover:shadow-lg hover:border-white/30 group' : '',
        className
    ]">
        <div v-if="withGradient" class="absolute inset-0" :class="gradientClass"></div>

        <v-card-title>
            <slot name="title">
                <h2 v-if="title" :class="[
                    'text-3xl font-bold',
                    titleClass || 'text-orange-400/50'
                ]">
                    {{ title }}
                </h2>
            </slot>
        </v-card-title> 
        <v-card-item :class="[
            'relative z-10',
            padding || 'p-4 md:p-4'
        ]">
            <slot></slot>


        </v-card-item>
        <v-card-actions>
            <slot name="actions">
            </slot>
        </v-card-actions>
    </v-card>
</template>

<script setup>
defineProps({
    item: {
        type: Object,
        default: {}
    },
    title: {
        type: String,
        default: ''
    },
    titleClass: {
        type: String,
        default: ''
    },
    className: {
        type: String,
        default: ''
    },
    padding: {
        type: String,
        default: ''
    },
    hoverEffect: {
        type: Boolean,
        default: false
    },
    withGradient: {
        type: Boolean,
        default: false
    },
    gradientClass: {
        type: String,
        default: 'bg-gradient-to-br from-blue-400/5 to-purple-500/10 group-hover:opacity-75 transition-opacity duration-500'
    },
})
</script>