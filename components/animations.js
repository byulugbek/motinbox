const easing = [0.6, -0.06, 0.01, 0.99];

export const fadeInSides = (x, y) => ({
    hidden: {
        x: x || 0,
        y: y || 0,
        opacity: 0,
    },
    visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: easing,
        }
    }
})