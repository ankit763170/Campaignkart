import { model, models } from "mongoose";

import { ServicesSchema } from "./service";
import { CasesSchema } from "./cases";
import { BlogSchema } from "./blog";
import { CategorySchema } from "./category";
import { UserSchema } from "./userModel";
import { CommentSchema } from "./comment";

const Services = models.Service || model("Service", ServicesSchema);
const Cases = models.Case || model("Case", CasesSchema);
const Blog = models.Blog || model("Blog", BlogSchema);
const Category = models.Category || model("Category", CategorySchema);
const User = models.User || model("User", UserSchema);
const Comments = models.Comment || model("Comment", CommentSchema);

export { Services, Cases, Blog, Category, User, Comments };
