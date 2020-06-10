---
path: /blog/2020-pca
date: 2020-01-23
title:
---

## TODO
- finish the algorithm part
- use small $\mathbf{x}$ for iid samples
- proofs
  - spectral theorem
  - variance property
- visualization
  - iris dataset
- when PCA fails?

## Setting

Consider a random variable $\mathbf{X} \in \mathbb{R}^d$ and its $n$ independent copieswith the same distribution $\mathbf{X}_1, \dots, \mathbf{X}_n$, where 

$$
\mathbf{X}_i = ({X}_i^1, \dots, {X}_i^d)^T
$$

and $(\cdot)^T$ denotes the transpose operation. Conveniently, we also construact a matrix $\mathbb{X}$ from these vectors

$$
\mathbb{X} = \begin{bmatrix}
{X}_1^1 & \dots & {X}_1^d \\
\cdot & {X}_i^j & \cdot \\ 
{X}_n^1 & \dots & {X}_n^d
\end{bmatrix},
$$

where $\mathbb{X}$'s row $i$-th represents $\mathbf{x}_i$. 



## Expectation and Covariance

Recall the definition of expectation
$$
\mathbb{E}[\mathbf{X}] = \int \mathbf{x} \mathbb{P}(\mathbf{X}=\mathbf{x})\text{d}\mathbf{x}.
$$
Using observed data, its **empirical average** $\bar \mathbf{X}$ is
$$
\bar \mathbf X = \frac{1}{n} \sum_{i=1}^n \mathbf{X}_i.
$$

Consider the covariance $\Sigma$ of $\mathbf{X}$,
$$
\begin{aligned}
\Sigma = \begin{bmatrix} 
\sigma_{1,1} & \dots & \sigma_{1,d} \\
 & \sigma_{j, k} & \ \\
\sigma_{d,1} & \dots & \sigma_{d,d} \\
\end{bmatrix}.
\end{aligned}
$$

Each entry $\sigma_{j,k}$ is
$$
\begin{aligned}
\sigma_{j,k} &= \text{cov}(\mathbf{X}^j, \mathbf{X}^k) \\
&= \mathbb{E}[(\mathbf{X}^j - \mathbb{E}[\mathbf{X}^j])(\mathbf{X}^k - \mathbb{E}[\mathbf{X}^k])]
\end{aligned}
$$

Equivalently, one can show that $\Sigma = \mathbb{E}[\mathbf{X}\mathbf{X}^T] - \mathbb{E}[\mathbf{X}]\mathbb{E}[\mathbf{X}]^T$. (TODO: full derivation).

The empirical covariance $S$ is 

$$
\begin{aligned}
S &= \frac{1}{n} \sum_{i=1}^n (\mathbf{X}_i - \bar \mathbf{X}) (\mathbf{X}_i - \bar \mathbf{X})^T \\
&= \frac{1}{n} \sum_{i=1}^n \mathbf{X}_i \mathbf{X}_i^T - \bar \mathbf{X} \bar \mathbf{X}^T \\
\end{aligned}
$$

### Computing empirical mean and covariance
For the empirical mean $\mathbf{x}$, we can directly compute it from $\mathbb{X}$ as follows:

$$
\bar \mathbf{X} = \frac{1}{n} \mathbb{X}^T \mathbb{1},
$$
where $\mathbb{1} \in \mathbb{R}^n$ with 1's in the entries. In constrast, computing $S$ from $\mathbb{X}$ is not that straight forward, but one can see that 

$$
\begin{aligned}
S &=  \frac{1}{n} \mathbb{X} \mathbb{X}^T + \frac{1}{n^2} (\mathbb{X}\mathbf{1}) (\mathbb{X}\mathbf{1})^T \\

&= \frac{1}{n} \mathbb{X} \mathbb{X}^T + \frac{1}{n^2} (\mathbb{X}\mathbf{1}) (\mathbf{1}^T \mathbb{X}^T) \\
&= \frac{1}{n} \mathbb{X} \underbrace{\bigg( \mathbb{I} + \frac{1}{n} \mathbf{1}_n \bigg)}_{H} \mathbb{X}^T,
\end{aligned}
$$
where $\mathbf{1}_n$ is a $n \times n$ matrix with 1's entries. (TODO: The derivation of the first line can be found at ...).


## Property of covariance matrices
Consider a vector $\mathbf{u} \in \Reals^d$. If we multiply it to the both side of the covariance matrix $S$, we get
$$
\begin{aligned}
\mathbf{u}^T S \mathbf{u} &= \frac{1}{n} \sum_{i=1}^n \mathbf{u}^T  \mathbf{X}_i \mathbf{X}_i^T \mathbf{u} - \mathbf{u}^T  \bar \mathbf{X} \bar \mathbf{X}^T  \mathbf{u} \\
&= \frac{1}{n} \sum_{i=1}^n (\mathbf{u}^T  \mathbf{X}_i )^2  - (\mathbf{u}^T  \bar \mathbf{x})^2 \\
&= \text{Empirical Var}(\mathbf u \mathbf{X}_i),
\end{aligned}
$$
where the conclusion comes from the fact that $\mathbf{u}^T\bar \mathbf{x} = \frac{1}{n} \sum_i \mathbf{u}^T \mathbf{x}_i$.

Fig. projection on x on u

Consider $\|\mathbf u \| = 1$. $\mathbf{u}^T\mathbf{x_i}$ is just a projection $\mathbf{x_i}$ onto $\mathbf{u}$. Therefore, if 
- $\mathbf{u}^T S \mathbf{u}$ high, it means that $\mathbf x_i$'s are very spread along this direction (high variance);
- $\mathbf{u}^T S \mathbf{u}$ low, it tells us that  $\mathbf x_i$'s locates in a narrow region. In the extreme case $\mathbf{u}^T S \mathbf{u} =0$, $\mathbf x_i$'s are a point on $\mathbf u$. 

Intuitively, such $\mathbf{u}$ directions that the data are still very spread after the project capture some meaniful information, while the other directions might not and can be ignored. So, how can one find such directions?

## Symmetric Matrices and Diagonalization
According to [Spectral theorem](https://brilliant.org/wiki/spectral-theorem/#), any real symmetric $A$ is diagonalizable, meaning there exists the following decomposition
$$
A = PDP^T,
$$
where $P \in \Reals^{d\times d}$ is an othogonal matrix ($PP^T=P^TP=I_{d}$) and $D$ is a diagonal matrix whose diagonal entries are $\lambda_1, \dots, \lambda_d$. More precisely, 
$$
\begin{aligned}
P = \begin{bmatrix}
| & \dots & | \\ 
\mathbf{v}_1 & \dots & \mathbf{v}_d\\
| & \dots & |
\end{bmatrix},\  D = \begin{bmatrix}
\lambda _1 & \ & 0 \\
 & \ddots & \ \\
0 & \ & \lambda_d \\
\end{bmatrix},
\end{aligned}
$$

where $\mathbf{v}_i$'s are eigenvectors associated to an eigenvalue $\lambda_i$.  Without loss of generality, let's assume that $\lambda_1 > \lambda_2 > \dots > \lambda_d$.


### Diagonalization of Covariance Matrices
With this result and the fact that $S$ is symmetric, we have the recipe of finding $\mathbf u$'s. More precisely, we write $S = PDP^T$, and the maximum variance in any direction is not more than $\lambda_1$.

To see this is actually the case, consider a vector $\mathbf{u}$ with $\| \mathbf{u} \|=1$ and $\mathbf{b} = P^T \mathbf{u}$:

$$
\begin{aligned}
\mathbf{u}^T S \mathbf{u} &= \mathbf{u}^T PDP^T \mathbf{u}  \\ 
&= \mathbf{b}^T D \mathbf{b} \\
&= \sum_{j=1}^d \lambda_j b_j^2 \\
&\le \lambda_1 \underbrace{\sum_{j=1}^d b_j^2}_{\|\mathbf{b}\|^2 = 1} \\
&= \lambda_1.
\end{aligned}
$$

In fact, we achieve the maximum variance $\lambda_1$ only when we pick $\mathbf{u} = \mathbf{v}_1$. Therefore, $\mathbf{v}_1$ is the direction that the data spreads the most, followed by $\mathbf{v}_2$ and so on.

Because the 

For any symmetric positive 
## 

### Choosing Principal Components





## Acknowldgement

https://ocw.mit.edu/courses/mathematics/18-650-statistics-for-applications-fall-2016/lecture-slides/MIT18_650F16_PCA.pdf 





## Proofs
### Property of Covariance
### Spectral Theorem


$$
\begin{aligned}
S &=  \frac{1}{n} \begin{bmatrix}
x_1^1 &  \dots & x_n^1  \\
\vdots \ & \ddots & \vdots \\
x_1^d &  \dots & x_n^d  \\
\end{bmatrix} \begin{bmatrix}
x_1^1 &  \dots & x_1^d  \\
\vdots \ & \ddots & \vdots \\
x_n^1 &  \dots & x_n^d  \\
\end{bmatrix}

\end{aligned}
$$








