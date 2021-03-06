// @flow
import { Group } from "webiny-api/entities";

export default async () => {
    const entity = new Group();
    entity.populate({
        name: "Default",
        description:
            "Default group - automatically assigned both authenticated and anonymous identities.",
        slug: "default"
    });

    await entity.save();
};
