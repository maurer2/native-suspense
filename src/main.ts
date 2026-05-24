import { faker } from "@faker-js/faker";

// import "./style.css";

// const section5Template = document.querySelector<HTMLElement>(
//   '[data-target="section5"]',
// )!;
// const button5 = document.querySelector<HTMLButtonElement>("#section5-button")!;
// const seperator = document.querySelector<HTMLButtonElement>("#seperator")!;
const parent = document.querySelector<HTMLElement>("main");

// adding "for"-dynamically doesn't work.
// button5.addEventListener("click", () => {
//   console.log("Button 5 clicked");

//   const targetAttribute = section5Template.getAttribute("data-target");

//   if (!targetAttribute) {
//     return;
//   }
//   section5Template.setAttribute("for", targetAttribute);

//   // @ts-expect-error too recent an addition
//   // section5.setHTML(section5Template.innerHTML);
// });

// doesn't work either, needs to be streamed in
// button5.addEventListener("click", () => {
//   console.log("Button 5 clicked");

//   // @ts-expect-error too recent an addition
//   section5Template.setHTML(section5Template.innerHTML);
// });

// doesn't work either, needs to be streamed in
// button6.addEventListener("click", () => {
//   const newTemplateElement = document.createElement("template");

//   newTemplateElement.setAttribute("for", "section6");
//   newTemplateElement.innerHTML = "Content for section 6";
//   // seperator.insertAdjacentElement("beforebegin", newTemplateElement);
//   parent.insertAdjacentElement("afterbegin", newTemplateElement);
// });

{
  const button5 = document.querySelector<HTMLButtonElement>("#section5-button");
  button5?.addEventListener("click", async () => {
    // @ts-expect-error too recent an addition
    const writer = parent.streamAppendHTMLUnsafe().getWriter();
    await writer.write(`
    <template for="section5-inner">
      Content for section 5 inner
    </template>
  `);

    await writer.close();
  });
}

{
  const button6 = document.querySelector<HTMLButtonElement>("#section6-button");
  button6?.addEventListener("click", async () => {
    // @ts-expect-error too recent an addition
    const writer = parent.streamAppendHTMLUnsafe().getWriter();
    await writer.write(`
    <template for="section6">
      Content for section 6
    </template>
  `);

    await writer.close();
  });
}

{
  const button7 = document.querySelector<HTMLButtonElement>("#section7-button");
  button7?.addEventListener("click", async () => {
    if (!parent) {
      return;
    }

    // @ts-expect-error too recent an addition
    const writer = parent.streamAppendHTMLUnsafe().getWriter();
    // names.push(faker.person.firstName());
    await writer.write(`
      <template for="section7">
        <li>${faker.person.firstName()}</li>
        <?marker name="section7"> <!-- needed for repeated insertion -->
      </template>
    `);

    await writer.close();
  });
}
