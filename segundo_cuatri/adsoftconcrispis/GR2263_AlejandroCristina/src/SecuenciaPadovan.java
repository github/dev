import java.util.*;

public class SecuenciaPadovan {
    private static final List<Integer> PADOVAN_INIT = List.of(1, 1, 1);
    private List<Integer> secuencia;
    public SecuenciaPadovan(int num) {
        this.secuencia = new ArrayList<>(PADOVAN_INIT);
        while (this.secuencia.size()<num)
            this.next();
    }
    @Override
    public String toString() {
        return this.secuencia.toString();
    }
public int next() {
    int numElementos = this.secuencia.size();
    int proxElemento = this.secuencia.get(numElementos-2)+this.secuencia.get(numElementos-3);
    this.secuencia.add(proxElemento);
    return proxElemento;
}
public static boolean esPadovan(List<Integer> seq) {
    if (seq.size()<3) return false;
        SecuenciaPadovan sp = new SecuenciaPadovan(seq.size());
    return sp.secuencia.equals(seq);
}
public static void main (String ...args) {
    for (String size : args) {
        int len = Integer.valueOf(size);
        if (len<3)
            System.out.println("Longitud "+len+" incorrecta");
    else {
        SecuenciaPadovan sp = new SecuenciaPadovan(Integer.valueOf(size));
        System.out.println("\nSecuencia de longitud "+len+": "+sp);
        System.out.println("Siguiente elemento: "+sp.next());
        System.out.println("Secuencia final: "+sp);
    }
    }       
        System.out.println(SecuenciaPadovan.esPadovan(List.of(1, 1, 1, 2, 2, 3)));
        System.out.println(SecuenciaPadovan.esPadovan(List.of(1, 1)));
}
}