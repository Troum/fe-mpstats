import type {NumberFilterModelInterface} from "~/interfaces/filters/NumberFilterModelInterface";
import type {TextFilterModelInterface} from "~/interfaces/filters/TextFilterModelInterface";
import type {CombinedSimpleFilterModelInterface} from "~/interfaces/filters/CombinedSimpleFilterModelInterface";

export interface FilterModelInterface {
    [key: string]: NumberFilterModelInterface|TextFilterModelInterface|CombinedSimpleFilterModelInterface<NumberFilterModelInterface|TextFilterModelInterface>
}