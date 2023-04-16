/**
* Esta aplicación genera una secuencia Skiponacci 
*
* @author Cristina García Pernías  cristina.garciapernias@estudiante.uam.es
* @author Alejando López Martinez  alejandro.lopez02@estudiante.uam.es
*
*/

import java.util.*;

public class SecuenciaSkiponacci {
    private List<Integer> secuencia;
    private static int pos1;
    private static int pos2;
    private static int listtype;


/**
* Método SecuenciaSkiponacci.
* Genera cualquier secuencia de Skiponacci. Para ello, el constructor recibirá 
* como argumentos la información necesaria para configurar la
* secuencia.
*
* @param num1 posición del primer elemento
* @param num2 posición del segundo elemento
* @param seq lista de elemntos iniciales
* @param num3 longitud de la secuencia a generar
*/
    public SecuenciaSkiponacci(int num1, int num2, List<Integer> seq, int num3) {
        this.secuencia = new ArrayList<>(seq);
        pos1 = num1;
        pos2 = num2;
        if(this.secuencia.get(0) == 1){
            listtype = 1;
        }
        else if(this.secuencia.get(0) == 3){
            listtype = 2;
        }
        else if (this.secuencia.get(0) == 0) {
            listtype = 3;
        }

        while (this.secuencia.size() < num3)
            this.next();
    }


/**
* Método toString.
* Método de objeto que devuelve la representación del objeto en forma de String
* @return string del objeto
*/
    @Override
    public String toString() {
        return this.secuencia.toString();
    }


/**
* Método next.
* Método de objeto que devuelve el siguiente elemento de la secuencia, y lo añade a la lista
* secuencia.
* @return proxElemento siguiente elemento de la secuencia
*/
    public int next() {
        int numElementos = this.secuencia.size();
        int proxElemento = this.secuencia.get(numElementos - pos1) + this.secuencia.get(numElementos - pos2);
        this.secuencia.add(proxElemento);
        return proxElemento;
    }


/**
* Método esSecuencia 
* Método que devuelve si la lista que se le pasa como argumento contiene una secuencia de Skiponacci válida.
*
* @param seq secuencia a comprobar 
*
* @return true or false 
*/
    public boolean esSecuencia(List<Integer> seq) {
        

        if (seq.size() < 2)
            return false;
        
        

        if(listtype == 1){
            SecuenciaSkiponacci padovan = new SecuenciaSkiponacci(pos1, pos2, List.of(1, 1, 1), seq.size());
            return padovan.secuencia.equals(seq);
        }
        else if(listtype == 2){
            SecuenciaSkiponacci perrin = new SecuenciaSkiponacci(pos1, pos2, List.of(3, 0, 2), seq.size());
            return perrin.secuencia.equals(seq);
        }
        else if (listtype == 3) {
            SecuenciaSkiponacci fibonacci = new SecuenciaSkiponacci(pos1, pos2, List.of(0, 1), seq.size());
            return fibonacci.secuencia.equals(seq);
        }
        else{
            return false;
        } 
    }


/**
* Punto de entrada a la aplicación.
* Este método genera secuencias de Skiponacci y comprueba que lo sean
*
* @param args Los argumentos de la línea de comando
*/
    public static void main(String... args) {
        SecuenciaSkiponacci padovan = new SecuenciaSkiponacci(2, 3, List.of(1, 1, 1), 10);
        SecuenciaSkiponacci perrin = new SecuenciaSkiponacci(2, 3, List.of(3, 0, 2), 10);
        SecuenciaSkiponacci fibonacci = new SecuenciaSkiponacci(1, 2, List.of(0, 1), 10);
        System.out.println("Padovan[10] : " + padovan);
        System.out.println("Perrin[10] : " + perrin);
        System.out.println("Fibonacci[10]: " + fibonacci);
        System.out.println("Fibonacci(11): " + fibonacci.next());
        System.out.println("Fibonacci[11]: " + fibonacci);
        System.out.println("Es Fibonacci?: " + fibonacci.esSecuencia(List.of(0, 1, 1, 2, 3)));
        System.out.println("Es Perrin?: " + perrin.esSecuencia(List.of(3, 0, 2, 4)));
    }
}