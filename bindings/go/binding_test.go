package tree_sitter_QS_test

import (
	"testing"

	tree_sitter "github.com/smacker/go-tree-sitter"
	"github.com/tree-sitter/tree-sitter-QS"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_QS.Language())
	if language == nil {
		t.Errorf("Error loading Qs grammar")
	}
}
