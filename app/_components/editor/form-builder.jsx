"use client";

import PreviewDialogBtn from "./preview-dialog-btn";
import PublishFormBtn from "./publish-form-btn";
import SaveFormBtn from "./save-form-btn";

const FormBuilder = ({ form }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between border-b-2 p-4 gap-3 items-center">
        <h2 className="truncate font-medium">
          <span className="text-muted-foreground mr-2">فرم: </span>
          {form.name}
        </h2>
        <div className="flex items-center gap-2">
          <PreviewDialogBtn />
          {!form.publioshed && (
            <>
              <SaveFormBtn />
              <PublishFormBtn />
            </>
          )}
        </div>
      </div>
      <div>main</div>
    </div>
  );
};

export default FormBuilder;
