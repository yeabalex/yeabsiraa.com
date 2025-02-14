import { Montserrat, Lato} from 'next/font/google'
import { NextFont } from 'next/dist/compiled/@next/font';

export const montserrat:NextFont = Montserrat({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
  });
  
export const lato:NextFont = Lato({
    weight: ['400', '700'],
    subsets: ['latin'],
  });