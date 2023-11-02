import type {Config} from 'tailwindcss'
import TailwindForm from "@tailwindcss/forms"

export default <Partial<Config>>{
    theme: {
        extend: {
            height: {
                'screen-50': '50vh',
            }
        }
    },
    plugins: [TailwindForm],
}
