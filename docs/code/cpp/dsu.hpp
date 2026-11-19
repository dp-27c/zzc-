#ifndef ZZC_DSU_HPP
#define ZZC_DSU_HPP

#include <numeric>
#include <utility>
#include <vector>

class DisjointSetUnion {
public:
    explicit DisjointSetUnion(int n) : parent_(n), size_(n, 1) {
        std::iota(parent_.begin(), parent_.end(), 0);
    }

    int find(int vertex) {
        if (parent_[vertex] != vertex) {
            parent_[vertex] = find(parent_[vertex]);
        }
        return parent_[vertex];
    }

    bool merge(int first, int second) {
        int first_root = find(first);
        int second_root = find(second);
        if (first_root == second_root) {
            return false;
        }
        if (size_[first_root] < size_[second_root]) {
            std::swap(first_root, second_root);
        }
        parent_[second_root] = first_root;
        size_[first_root] += size_[second_root];
        return true;
    }

    int component_size(int vertex) {
        return size_[find(vertex)];
    }

private:
    std::vector<int> parent_;
    std::vector<int> size_;
};

#endif
