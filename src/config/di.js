import DIContainer, { object, use, factory, func, IDIContainer } from "rsdi";

export default function configureDI() {
    const container = new DIContainer();
    return container;
}
