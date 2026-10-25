import {
    type ComponentPropsWithoutRef,
    type ElementType,
    type ReactNode
} from "react";

/*
  <T extends ElementType>

  T é um GENERIC.

  Pense em T como uma "variável de tipo".

  O valor de T será descoberto dependendo do que
  colocarmos na propriedade "as".

  Por exemplo:

      <Container as="button" />

  → T será "button".

  Ou:

      <Container as="a" />

  → T será "a".

  "extends ElementType" significa:

      T só pode ser algo que o React considera
      um tipo de elemento/componente válido.
*/

/*
  ContainerProps recebe um generic T.

  "as?: T"

  significa que "as" recebe o tipo que T representa.

  "children: ReactNode"

  significa que o Container pode receber conteúdo React.

  "& ComponentPropsWithoutRef<T>"

  é uma INTERSEÇÃO.

  Estamos juntando:

      nossas próprias props
          +
      todas as props do elemento escolhido em "as".
*/
type ContainerProps<T extends ElementType> = {
    as?: T;
    children: ReactNode;
} & ComponentPropsWithoutRef<T>;

/*
  Aqui temos outro generic:

      <C extends ElementType>

  C poderia se chamar T também.

  O nome C NÃO possui nenhum significado especial.

  Poderíamos escrever:

      function Container<T extends ElementType>

  O autor escolheu C provavelmente para representar
  "Component".

  C será descoberto a partir da propriedade "as".
*/
export default function Container<C extends ElementType>(
    {
        as,
        children,
        ...props
    }: ContainerProps<C>
) {

    /*
      Se "as" existir, usamos o elemento/componente informado.

      Se "as" não existir, usamos "div".

      Portanto:

          <Container />

          → Component = "div"

      enquanto:

          <Container as="section" />

          → Component = "section"
    */
    const Component: C | "div" = as || "div";

    /*
      Renderizamos o componente escolhido.

      {...props}
      → passa as outras propriedades para ele.

      {children}
      → passa o conteúdo interno.

      Exemplo:

          <Container as="button" disabled>
            Clique
          </Container>

      será equivalente a algo parecido com:

          <button disabled>
            Clique
          </button>
    */
    return (
        <Component {...props}>
            {children}
        </Component>
    );
}