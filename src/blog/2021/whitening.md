---
path: "/blog/2021-whitening"
date: "2021-02-09"
title: "Approaches for Whitening Data"
---


Consider a dataset $\mathcal{D} = \{ \mathbf x_i \in \reals^d\}_{i=1}^n$. Denote $\mathbf X \in \reals^{d \times n}$  be the data matrix. Without loss of generality, we assume that the data has zero mean; thus the covariance matrix is $\Sigma = \frac{1}{n} \mathbf X   \mathbf X^T$. 

Define $\psi(\cdot)$  be the whitening operator parameterized by $W$, which is commonly referred to whitening matrix. Let $\hat \mathbf X := \psi(\mathbf X)$.  The goal of whitening is to decorate the data; that is 

$$
\frac{1}{n} \hat \mathbf{X} \hat \mathbf{X}^T  
= \hat \Sigma = I.
$$

Recall that $\Sigma$  is symmetric and positive definite; it thus can be decomposed into 

$$
\Sigma = U \Lambda U^T,
$$

where $U$'s columns are $\Sigma$'s eigenvectors and $\Lambda$  is a diagonal matrix containing real eigenvalues $\sigma^2_i\  \forall i \in [1,d]$. 

Because $U$ is a orthonormal matrix, i.e. $\mathbf u_i ^T \mathbf u_j = 0 \forall i,j \in [1, m]$ and $i\ne j$. Consider $\mathbf u_i$. The above derivation shows that 

$$
\begin{aligned}
( \mathbf u_i ^T \mathbf X)  (\mathbf u_i ^T \mathbf X)^T  &= \sum_{j=1}^n (\mathbf u_i^T \mathbf x_j)^2  \\
&= \sigma_i^2.
\end{aligned}
$$

In other word, we would like to find $W$ that satisfies $W^T W= \Sigma^{-1}$. We can see this condition yields the diagonal coraviance condition:

$$
\begin{aligned}
\hat{\mathbf  X}\hat{\mathbf  X}^T &= (W\mathbf X)^T (W\mathbf X) \\
&= \mathbf X^T W^T W\mathbf X \\
&= \mathbf X^T W^T W\mathbf X \\
&= \mathbf X^T \Sigma^{-1} \mathbf X \\
&= \mathbf X^T U \Lambda^{-1} U^T\mathbf X \\
&= nI
\end{aligned}
$$

## Approach 1: PCA-Whitening

With this fact, the natural choice of the whitening operator is

$$
\psi_{\text{PCA}}(\mathbf X) = \underbrace{\Lambda^{-1/2} U^T}_{:=W_\text{PCA}} \mathbf X.
$$

Thus, we can see that 

$$
\begin{aligned}
W_{\text{PCA}}^TW_{\text{PCA}} &= (\Lambda^{-1/2} U^T)^T \Lambda^{-1/2} U^T \\
&= U \Lambda^{-1/2}\Lambda^{-1/2} U^T \\
&= U \Lambda^{-1}U^T \\
&= \Sigma^{-1}.
\end{aligned}
$$

## Approach 2: ZCA-Whitening

However, whitening is not unique because whitened data remains whitened when transform. We can impose an additional constraint on $\psi$. In particular, we can rotate the PCA-whitened data to be close to the original data. This is called Zero-Phase Component Analysis (ZCA):

$$
\begin{aligned}
\psi_\text{ZCA}(\mathbf X) &= {U \Lambda^{-1/2}U^T}\mathbf X \\
&= \underbrace{U \Lambda^{-1/2}U^T}_{W_{\text{ZCA}}} \mathbf X.
\end{aligned}
$$

In fact, one can see that $W_\text{ZCA}  = \Sigma^{-1/2}$. 

## Approach 3: Cholesky Decomposition

For a positive definite matrix $\Sigma$, we know that we can decompose it into 

$$
\Sigma = L L^T ,
$$

where $L$ is a lower triangular matrix. Inverting the equation above gives us 

$$
\begin{aligned}
\Sigma^{-1} &= (LL^T)^{-1} \\
&= (L^T)^{-1} L^{-1} \\
&\overset{(1)}{=} (L^{-1})^{T} L^{-1},
\end{aligned}
$$

where (1) uses the fact that matrix inverse and transpose are exchangeable. Here, it is obvious that we can take

$$
W_\text{chol} = L^{-1}.
$$

Because $L^{-1}$  is also [a lower triangular matrix](https://math.stackexchange.com/questions/245871/proving-the-inverse-if-any-of-a-lower-triangular-matrix-is-lower-triangular). This invert can be computed efficiently using [forward substitution](https://en.wikipedia.org/wiki/Triangular_matrix#Forward_and_back_substitution).

<div align="center">
  <img src="https://i.imgur.com/STXioPz.png" style="width: 100%"/>
  <div style="color: gray">Figure 1: Data whitened with various approaches. Although the results look similar, ZCA-whitened data is closed to the original.
  </div>
</div>


## Appendix
These are resources that I consult while writing this blog:
- [Colab notebook  for the figure.](https://colab.research.google.com/drive/1Y1NjQkDUlr6DUX_-sTuSVNJu_YjBbU8N#scrollTo=52MLSrC1tw7G)
- [Kessy et al. (2015), "Optimal Whitening and Decorrelation"](https://arxiv.org/pdf/1512.00809.pdf)
- [H. Larochelle, Sparse coding - ZCA preprocessing](https://www.youtube.com/watch?v=eUiwhV1QcQ4)
