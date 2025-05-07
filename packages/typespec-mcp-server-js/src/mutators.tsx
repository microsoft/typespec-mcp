import { unsafe_Mutator, unsafe_MutatorFlow } from "@typespec/compiler/experimental";
import { $ } from "@typespec/compiler/typekit";
// Unsure if the filter/replace for non-enum types should be needed.
// https://github.com/microsoft/typespec/issues/7003
const passthrough = {
  filter() {
    return unsafe_MutatorFlow.MutateAndRecur;
  },
  mutate() {},
};

export const EnumToUnion: unsafe_Mutator = {
  name: "removeEnum",
  Enum: {
    filter: (type) => {
      return unsafe_MutatorFlow.MutateAndRecur;
    },
    replace(en, _, program) {
      return $(program).union.create({
        variants: [...en.members.values()].map((enumMember) => {
          return $(program).unionVariant.create({
            type: $(program).literal.create(enumMember.value ?? enumMember.name),
          });
        }),
      });
    },
  },
  Operation: passthrough,
  Interface: passthrough,
  Tuple: passthrough,
  Model: passthrough,
  ModelProperty: passthrough,
  Union: passthrough,
  UnionVariant: passthrough,
};
