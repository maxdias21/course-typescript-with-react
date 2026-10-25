import { type ComponentPropsWithoutRef } from "react";

/*
  ComponentPropsWithoutRef<'button'> pega todas as props
  normais que um <button> aceita.

  Depois adicionamos:

      href?: never

  "?"

  → a propriedade pode não existir.

  "never"

  → se for fornecida, ela não deve possuir um valor válido.

  A ideia é impedir que um Button receba "href".
*/
type ButtonProps = ComponentPropsWithoutRef<"button"> & {
    href?: never;
};

/*
  Aqui fazemos o contrário.

  Pegamos todas as props normais de <a>.

  href?: string

  significa que href pode ser fornecido e, se fornecido,
  deve ser uma string.
*/
type AnchorProps = ComponentPropsWithoutRef<"a"> & {
    href?: string;
};

/*
  O Button pode receber DOIS formatos de props:

      ButtonProps
          OU
      AnchorProps

  O TypeScript precisa descobrir qual dos dois estamos usando.
*/
function isAnchorProps(
    props: ButtonProps | AnchorProps
): props is AnchorProps {

    /*
      "in" verifica se uma propriedade existe no objeto.

      Se "href" existir, entendemos que são AnchorProps.

      O "props is AnchorProps" é um TYPE GUARD.

      Ele informa ao TypeScript:

          "Se essa função retornar true,
           considere props como AnchorProps."
    */
    return "href" in props;
}

/*
  O componente aceita ButtonProps OU AnchorProps.
*/
export default function Button(
    props: ButtonProps | AnchorProps
) {

    /*
      Se existir href, tratamos como AnchorProps.
    */
    if (isAnchorProps(props)) {
        return (
            /*
              Aqui renderizamos <a>.

              {...props} passa as propriedades para o <a>.

              Exemplo:

                  <Button href="google.com">

              resulta em algo semelhante a:

                  <a href="google.com">
            */
            <a className="button" {...props}></a>
        );
    }

    /*
      Se não for AnchorProps, tratamos como ButtonProps.

      Portanto renderizamos um <button>.
    */
    return (
        <button className="button" {...props}>
        </button>
    );
}