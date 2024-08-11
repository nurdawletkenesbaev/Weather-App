import icon_1 from '../images/cloud-5.png'
import icon_2 from '../images/cloud-17.png'
import icon_3 from '../images/cloud-f-6.png'
import icon_4 from '../images/cloud-f-rain-7.png'
import icon_5 from '../images/cloud-rain-9.png'
import icon_6 from '../images/cloud-sun-10.png'
import icon_7 from '../images/cloud-wind-8.png'
import icon_8 from '../images/cloud-wind-13.png'
import icon_9 from '../images/moon-11.png'
import icon_10 from '../images/moon-star-4.png'
import icon_11 from '../images/sun-2.png'
import icon_12 from '../images/sun-rain-16.png'

export function weatherIcon(icon) {
    switch (icon) {
        case '04d':
            return icon_1
        case '04n':
            return icon_1
        case '03d':
            return icon_2
        case '03n':
            return icon_2
        case '11d':
            return icon_3
        case '11n':
            return icon_4
        case '10d':
            return icon_12
        case '10n':
            return icon_5
        case '01d':
            return icon_11
        case '01n':
            return icon_9
        case '9d':
            return icon_12
        case '9n':
            return icon_12
        case '02d':
            return icon_6
        case '02n':
            return icon_10
        case '50d':
            return icon_8
        case '50n':
            return icon_8
        case '13d':
            return icon_7
        case '13n':
            return icon_8

    }
}