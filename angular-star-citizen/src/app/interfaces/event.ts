import { Role } from './role';
import { Application } from './application';
export interface Event {
    id: string;
    name: string;
    datetime: string;
    description: string;
    image: string;
    link: string;
    roles: Role[];
    application: Application[];
}
