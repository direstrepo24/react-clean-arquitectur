import { Container } from "inversify";
import { userModule } from "@infrastructure/index";
import { httpClientModule } from "@core/index";

// Crear contenedor de Inversify
const di = new Container();
//Transversales
di.load(httpClientModule)
// Cargar módulos en el contenedor
di.load(userModule);
export { di };