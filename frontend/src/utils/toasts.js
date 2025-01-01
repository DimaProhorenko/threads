import { toaster } from "@/components/ui/toaster";

export const createToast = (type, title, description) => {
  toaster.create({
    type,
    title,
    description,
  });
};

export const successToast = (title, description = null) => {
  createToast("success", title, description);
};

export const errorToast = (title, description = null) => {
  createToast("error", title, description);
};
