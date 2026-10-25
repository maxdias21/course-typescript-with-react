import Button from "./components/Button.tsx";
import Container from "./components/Container.tsx";
import Input from "./components/Input.tsx";
import { useRef } from "react";
import Form, { type FormHandle } from "./components/Form.tsx";

function App() {
    // useRef<HTMLInputElement> significa:
    // "Esse ref vai apontar para um elemento HTMLInputElement".
    //
    // Começa como null porque o <input> ainda não existe no DOM
    // durante a primeira renderização.
    const inputRef = useRef<HTMLInputElement>(null);

    // Aqui o ref NÃO aponta diretamente para um elemento HTML.
    //
    // FormHandle é um tipo criado por nós no componente Form.
    // Ele define quais funções/propriedades o componente Form
    // vai disponibilizar através do ref.
    //
    // Nesse caso:
    // customFormRef.current?.clear()
    //
    // poderá chamar a função "clear" que o Form expõe.
    const customFormRef = useRef<FormHandle>(null);

    function handleSave(data: unknown) {
        // data é "unknown" porque o Form não sabe antecipadamente
        // qual será o formato dos dados enviados.
        //
        // Aqui nós dizemos ao TypeScript:
        // "Eu sei que esses dados possuem name e age, ambos string."
        //
        // IMPORTANTE:
        // "as" NÃO transforma nem valida o objeto em runtime.
        // É apenas uma afirmação para o TypeScript.
        const extractedData = data as {
            name: string;
            age: string;
        };

        console.log(extractedData);

        // ?. significa:
        // "só execute clear() se current não for null/undefined".
        //
        // O Form disponibiliza essa função através de useImperativeHandle.
        customFormRef.current?.clear();
    }

    return (
        <>
            {/*
        Container é um componente polimórfico.

        "as={Button}" diz:
        "Container deve renderizar o componente Button".

        Portanto, aqui:

        Container
          ↓
        Button
          ↓
        elemento <button> ou <a>, dependendo das props
      */}
            <Container as={Button}>Click me</Container>

            {/*
        O ref aponta para o elemento <input> real.

        Como Input usa forwardRef, ele consegue receber esse ref
        e repassá-lo para o <input> que está dentro dele.

        Depois disso podemos fazer:
        inputRef.current?.focus()

        por exemplo.
      */}
            <Input label="Test" id="test" ref={inputRef} />

            {/*
        Aqui o ref aponta para o "handle" personalizado do Form,
        e não diretamente para o elemento <form>.

        O Form expõe:

        {
          clear: () => void
        }

        através de useImperativeHandle.
      */}
            <Form ref={customFormRef} onSave={handleSave}>
                <Input label="age" id="username" />
                <Input label="age" id="age" />

                <Button>Submit</Button>
            </Form>
        </>
    );
}

export default App;