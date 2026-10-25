import {
    type ComponentPropsWithRef,
    forwardRef
} from "react";

/*
  Nossas props personalizadas:

      label
      id

  E também todas as props normais de <input>.

  ComponentPropsWithRef é usado porque queremos
  trabalhar com um ref nesse componente.
*/
type InputProps = {
    label: string;
    id: string;
} & ComponentPropsWithRef<"input">;

/*
  forwardRef também recebe dois generics:

      forwardRef<TipoDoRef, TipoDasProps>

  Primeiro:

      HTMLInputElement

  → o ref aponta para um elemento <input> real.

  Segundo:

      InputProps

  → são as props que o componente aceita.
*/
export default forwardRef<HTMLInputElement, InputProps>(
    function Input(
        // Props recebidas pelo componente.
        //
        // label e id são separados.
        //
        // ...props contém todas as outras props.
        //
        // Exemplo:
        //
        // <Input
        //   label="Nome"
        //   id="name"
        //   placeholder="Digite seu nome"
        // />
        //
        // props ficará com:
        //
        // { placeholder: "Digite seu nome" }
        { label, id, ...props }: InputProps,

        // Ref recebido pelo forwardRef.
        //
        // Esse ref veio de:
        //
        // <Input ref={inputRef} />
        //
        // e aponta para o <input> real.
        ref
    ) {
        return (
            <>
                <p>

                    {/*
            htmlFor liga o <label> ao <input> que possui
            o mesmo id.

                htmlFor="name"
                id="name"
          */}
                    <label htmlFor={id}>
                        {label}
                    </label>

                    {/*
            Aqui finalmente colocamos o ref no elemento DOM.

            Isso é o que permite:

                inputRef.current

            apontar para esse <input>.

            name={id} é importante para FormData.

            Por exemplo:

                id="age"

            resulta em:

                name="age"

            Assim o FormData consegue obter:

                age → valor digitado
          */}
                    <input
                        id={id}
                        name={id}
                        ref={ref}
                        {...props}
                    />
                </p>
            </>
        );
    }
);