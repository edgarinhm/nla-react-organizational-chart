import { useEffect, useState } from "react";
import { z, ZodError } from "zod";

// creating a schema
export const OrgCardChartSchema = z.object({
    division: z.string().min(1, { message: "Division is required." }),
    positionName: z.string().trim().min(1, { message: "Position is required." }).max(150, { message: "Position name is too long." }),
});

export const useOrgCardChartValidation = (position) => {
    const [errors, setErrors] = useState({})
    const [hasErrors, setHasErrors] = useState(false);

    const { division, positionName } = position;

    useEffect(() => {
        let newHasErrors = false;
        try {
            OrgCardChartSchema.parse({ division, positionName });
            setHasErrors(false);
        } catch (error) {
            if (error instanceof ZodError) {
                let zodErrors = [];
                error.issues.forEach((zodError) => {
                    zodErrors[zodError.path[0]] = zodError.message;
                });
                setErrors(zodErrors);

            }
            newHasErrors = true;
        }
        setHasErrors(newHasErrors)
    }, [division, positionName]);

    return [errors, hasErrors]
}