# CaseTransform

This library helps to transform the case to UPPER or LOWER while typing on the reactive input field for Angular components.

## Usage

1. copy the source case-transform.directive.ts to your project.
2. import the directive in your desired module.
3. In your app component, add the directive "appInputTransformCase" as follows

   `<input matInput name="firstName" formControlName="firstName" appInputTransformCase="upper"> <!--toconvert to upper case --> `
   
   `<input matInput name="lastName" formControlName="lastName" appInputTransformCase="lower"> <!--toconvert to lower case -->`

