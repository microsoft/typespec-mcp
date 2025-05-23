import { ModelProperty, Value } from "@typespec/compiler";
import { HttpProperty } from "@typespec/http";

/**
 * Checks if a parameter has a default value. Only honors default values for content-type.
 * @param property Property to check
 * @returns whether the property has a default value
 */
export function hasDefaultValue(property: HttpProperty): boolean {
  return getDefaultValue(property) !== undefined;
}

export function getDefaultValue(property: ModelProperty): string | number | boolean | undefined;
export function getDefaultValue(property: HttpProperty): string | number | boolean | undefined;
export function getDefaultValue(
  httpOrModelProperty: HttpProperty | ModelProperty,
): string | number | boolean | undefined {
  let property;

  if ("kind" in httpOrModelProperty && httpOrModelProperty.kind === "ModelProperty") {
    property = httpOrModelProperty;
  } else {
    property = httpOrModelProperty.property;
  }

  if (property.defaultValue) {
    if ("value" in property.defaultValue) {
      return getValue(property.defaultValue);
    }
  }

  if ("value" in property.type && property.type.value !== undefined) {
    return JSON.stringify(property.type.value);
  }

  return undefined;
}

function getValue(value: Value | undefined) {
  if (!value) {
    return undefined;
  }
  switch (value.valueKind) {
    case "StringValue":
      return `"${value.value}"`;
    case "NumericValue":
      return value.value.asNumber() ?? undefined;
    case "BooleanValue":
      return value.value;
    default:
      return undefined;
  }
}
