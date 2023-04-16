import java.util.*;

public class SecuenciaSkiponacci {
    private List<Integer> secuencia;
    private int pos1;
    private int pos2;
    private int listtype;

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

    @Override
    public String toString() {
        return this.secuencia.toString();
    }


    public int next() {
        int numElementos = this.secuencia.size();
        int proxElemento = this.secuencia.get(numElementos - pos1) + this.secuencia.get(numElementos - pos2);
        this.secuencia.add(proxElemento);
        return proxElemento;
    }

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