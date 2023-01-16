interface Restaurant {
    id: number;
    name: string;
    email: string;
    password: string;
    telephone: string;
    location: string;
    plan: {
        menu_plan: number, 
        image_number: number,
        client_order: number,
        waiter_order: number,
    };
}

export default Restaurant;