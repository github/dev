package HTML.source.java;



class Test {
    float a;
    float b;
    float multiResult;
    float subResult;
    Test(float a, float b) {
        this.a = a;
        this.b = b;
    }

    public void sub(){
        subResult = a - b;
    }

    public void multi(){
        try {
            multiResult = a / b;
        } catch (Exception e) {}
    }
}

class T1 implements Runnable {
    private Test t;
    public T1(Test t) { 
        this.t = t;
    }

    @Override
    public void run(){
        t.sub();
    }
}

class T2 implements Runnable {
    private Test t;
    public T2(Test t) { 
        this.t = t;
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {}
    }

    @Override
    public void run(){
        t.multi();
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {}
    }
}

class T3 implements Runnable {
    private Test t;
    public T3(Test t) { 
        this.t = t;
    }

    @Override
    public void run(){
        float sum = t.a + t.b;
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {}
        float t4 = sum * t.subResult;
        float result = t.multiResult * t4;
        System.out.println(result);
    }
}

public class ThreadExam {
    public static void main(String[] args) {
        Test t = new Test(4, 2);
        Thread t1 = new Thread(new T1(t));
        Thread t2 = new Thread(new T2(t));
        Thread t3 = new Thread(new T3(t));
        
        t2.start();
        t1.start();
        t3.start();
        
        
    }
}