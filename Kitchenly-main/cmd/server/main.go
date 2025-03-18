package server

import (
	"context"
	"fmt"
	"os"
	"io"
	"os/signal"
)

func run(ctx context.Context, w io.Writer, args []string) error {
	ctx, cancel := signal.NotifyContext(ctx, os.Interrupt)
	defer cancel()

	e := NewServer()
	e.Logger.Fatal(e.Start(":80"))
	// ...
}

func main() {
	ctx := context.Background()
	if err := run(ctx, os.Stdout, os.Args); err != nil {
		fmt.Fprintf(os.Stderr, "%s\n", err)
		os.Exit(1)
	}
}