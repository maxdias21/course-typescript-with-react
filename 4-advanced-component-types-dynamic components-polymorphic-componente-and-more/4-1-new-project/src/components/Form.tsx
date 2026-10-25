import {
    type ComponentPropsWithoutRef,
    type FormEvent,
    useImperativeHandle,
    useRef,
    forwardRef
} from "react";

/*
  ComponentPropsWithoutRef<'form'>:

  Pega todas as propriedades normais que um <form> do React aceita.

  Por exemplo:

  onSubmit
  action
  method
  className
  id
  etc.

  Depois adicionamos nossa própria propriedade:

  onSave
*/
type FormProps = ComponentPropsWithoutRef<"form"> & {
    // Função que será chamada quando o formulário for enviado.
    //
    // Ela recebe os valores do formulário.
    onSave: (values: unknown) => void;
};

/*
  Esse é o "contrato" do ref personalizado do Form.

  Ou seja, quem usar:

      const formRef = useRef<FormHandle>(null);

  poderá acessar aquilo que estiver definido aqui.

  Atualmente o Form disponibiliza apenas:

      clear()

  Portanto:

      formRef.current?.clear();

  é permitido.
*/
export type FormHandle = {
    clear: () => void;
};

/*
  forwardRef possui dois generics:

  forwardRef<TipoDoRef, TipoDasProps>

  Primeiro:
      FormHandle

  → diz qual será o tipo do objeto disponibilizado pelo ref.

  Segundo:
      FormProps

  → diz quais props o componente recebe.

  Portanto:

      forwardRef<FormHandle, FormProps>

  significa:

      "Esse componente recebe FormProps
       e seu ref será do tipo FormHandle."
*/
const Form = forwardRef<FormHandle, FormProps>(
    function Form(
        // Desestruturação das props:
        //
        // children → conteúdo colocado dentro do <Form>
        // onSave   → nossa função personalizada
        // ...props → todas as outras props do <form>
        { children, onSave, ...props },

        // ref recebido pelo forwardRef.
        //
        // Esse ref veio de:
        //
        // <Form ref={customFormRef} />
        //
        ref
    ) {

        /*
          Esse ref é DIFERENTE do ref recebido acima.

          form é um ref interno que aponta diretamente
          para o elemento HTML <form>.

          Por isso o tipo é HTMLFormElement.
        */
        const form = useRef<HTMLFormElement>(null);

        /*
          useImperativeHandle permite definir manualmente
          o que o componente vai expor através do ref.

          Sem isso, o ref poderia apontar diretamente para
          o elemento DOM.

          Aqui estamos dizendo:

              "Quando alguém usar o ref do Form,
               disponibilize este objeto:"

               {
                 clear: ...
               }
        */
        useImperativeHandle(ref, () => {
            return {
                /*
                  Função que será acessível externamente:

                      customFormRef.current?.clear();

                  Quando chamada, ela executa reset() no formulário.
                */
                clear() {
                    form.current?.reset();
                }
            };
        });

        /*
          Função executada quando o formulário é enviado.
        */
        function handleSubmit(event: FormEvent<HTMLFormElement>) {
            // Impede o comportamento padrão do navegador:
            // recarregar/navegar a página ao enviar o formulário.
            event.preventDefault();

            /*
              FormData pega os campos do formulário.

              Para um campo ser encontrado pelo FormData,
              ele precisa possuir "name".

              No nosso Input:

                  <input id={id} name={id} />

              Portanto os dados poderão ser encontrados pelo name.
            */
            const formData = new FormData(event.currentTarget);

            /*
              Converte os dados do FormData para um objeto JavaScript.

              Exemplo:

              FormData:
                  name → "João"
                  age  → "20"

              Object.fromEntries(...)
              ↓

              {
                name: "João",
                age: "20"
              }
            */
            const data = Object.fromEntries(formData);

            // Envia os dados para a função que veio do App.
            //
            // No App:
            //
            // <Form onSave={handleSave}>
            //
            // Portanto onSave aponta para handleSave.
            onSave(data);
        }

        return (
            /*
              {...props} espalha as outras propriedades recebidas
              pelo componente no <form>.

              Por exemplo, se alguém fizer:

                  <Form className="formulario">

              className estará dentro de props e será passado para
              o <form>.
            */
            <form
                onSubmit={handleSubmit}
                {...props}
                ref={form}
            >
                {/*
          children representa tudo que foi colocado dentro do Form.

          Exemplo:

              <Form>
                <Input />
                <Button />
              </Form>

          children será:
              <Input />
              <Button />
        */}
                {children}
            </form>
        );
    }
);

export default Form;