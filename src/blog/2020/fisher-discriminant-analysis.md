---
path: /blog/2020-fisher-discriminant-analysis
date: 2020-11-16
title: Fisher Discriminant Analysis
---

One challenge is in classification is the curse dimensionality in which the amount of finite samples required to properly estimate the underlying distribution of the data goes exponentially with the dimension of the data. Therefore, it might be a reasonable and efficient way to first perform dimensionality reduction and operate on this subspace.

However, one issue might arise is that we might lose some information that is meaningful for classification.  To illustrate, the figure shows the effect of projection on distinguishing two groups of data.


<div align="center">
  <img src="https://i.imgur.com/EjF1fUm.png"/ width="400px"/><br/>
  <div style="color: gray">Fig. 1: Projection direction that does not separate the two distribution well.</div>
</div>

# How  could we find such a direction?

Let $\mathbf w \in \Reals^d$ be the direction that we aim to find; We also assume that $\| \mathbf w \| = 1$. Consider two groups of data $\mathcal{N}_1 = \{ \mathbf x \in \Reals^d \}$ and $\mathcal{N}_2 = \{ \mathbf x \in \Reals^d \}$;  The projection of these samples are : $\mathbf w^T\mathbf x$. Noting here that we implicitly represent the bias term in the inner production, i.e. the last feature of these samples $\mathbf x \in N_1 \cup N_2$ is always 1.

From  Fig 1, we can observe that the direction that would allow  us to separate the two classes best is the one that maximizes the distance between the means ($\hat \mu_1, \hat \mu_2 \in \Reals )$ of these data after projection. Moreover, the projection would be more discriminate if the two distributions after projection are narrow; in other word, it implies that the variances of these distributions should be small. With this, we can construct the objective function: 

$$
J(\mathbf w) = \frac{(\hat \mu_1 - \hat \mu_2)^2 }{\sigma_1^2+\sigma_2^2},
$$

where our goal is $\argmax_{\mathbf w \in \Reals^d, \|\mathbf w \| = 1} J(\mathbf w)$.

where our goal is $\argmax_{\mathbf w \in \Reals^d, \|\mathbf w \| = 1} J(\mathbf w)$. For the nominator, we can rewrite it as

$$
\begin{aligned}
(\hat \mu_1 - \hat \mu_2)^2 &=  \Bigg( \frac{1}{|\mathcal{N}_1|} \sum_{\mathbf x \in \mathcal{N}_1}\mathbf w^T\mathbf x - \frac{1}{|\mathcal{N}_2|} \sum_{\mathbf x \in \mathcal{N}_2}\mathbf w^T\mathbf x \Bigg)^2 \\
&=  \Bigg( \frac{1}{|\mathcal{N}_1|} \sum_{\mathbf x \in \mathcal{N}_1}\mathbf w^T\mathbf x - \frac{1}{|\mathcal{N}_2|} \sum_{\mathbf x \in \mathcal{N}_2}\mathbf w^T\mathbf x \Bigg)\Bigg( \frac{1}{|\mathcal{N}_1|} \sum_{\mathbf x \in \mathcal{N}_1} \mathbf x^T \mathbf w - \frac{1}{|\mathcal{N}_2|} \sum_{\mathbf x \in \mathcal{N}_2}\mathbf x^T \mathbf w\Bigg) \\
&= \mathbf w^T \underbrace{\Bigg( \frac{1}{|\mathcal{N}_1|} \sum_{\mathbf x \in \mathcal{N}_1}\mathbf x - \frac{1}{|\mathcal{N}_2|} \sum_{\mathbf x \in \mathcal{N}_2}\mathbf x \Bigg) \Bigg( \frac{1}{|\mathcal{N}_1|} \sum_{\mathbf x \in \mathcal{N}_1}\mathbf x^T - \frac{1}{|\mathcal{N}_2|} \sum_{\mathbf x \in \mathcal{N}_2}\mathbf x^T \Bigg)}_{\triangleq S_B} \mathbf w,
\end{aligned}
$$


where $S_B$ is called *between-class covariate matrix*. Similarly, we can expand the denominator term:

$$
\begin{aligned}
\sigma_1^2 + \sigma_2^2 &= \Bigg( \frac{1}{\mathcal |\mathcal{N}_1|} \sum_{\mathbf x \in \mathcal N_1} (\mathbf w^T\mathbf x - \hat \mu_1)^2
- \frac{1}{\mathcal |\mathcal N_2|} \sum_{\mathbf x \in \mathcal N_2} (\mathbf w^T\mathbf x - \hat \mu_2)^2 \Bigg).
\end{aligned}
$$

Let look at $\sum_{\mathbf x} (\mathbf w^T\mathbf x - \hat \mu_1)^2$
: we can complete the square and get the outer product:

$$
\begin{aligned}
\sum (\mathbf w^T\mathbf x - \hat \mu_i)^2 &= \sum \Bigg[\mathbf w^T\mathbf x - \frac{1}{|\mathcal N_i|} \sum \mathbf w^T\mathbf x \Bigg] \Bigg[\mathbf x^T\mathbf w - \frac{1}{\mathcal |\mathcal N_i|} \sum \mathbf x^T\mathbf w \Bigg] \\
&=\mathbf{w}^T \underbrace{\Bigg[\mathbf x - \frac{1}{|\mathcal N_i|} \sum \mathbf x \Bigg] \Bigg[\mathbf x^T - \frac{1}{|\mathcal N_i|} \sum \mathbf x^T \Bigg]}_{\triangleq S_i} \mathbf w.
\end{aligned}
$$

With this derivation, we have $\sigma_1^2 + \sigma_2^2 = \mathbf w^T(S_1 + S_2) \mathbf w$. Let define $S_W \triangleq S_1 + S_2$ called *within-class covariate matrix*.  Therefore, the objective function becomes

$$
J(\mathbf w) = \frac{\mathbf w^T S_B \mathbf w}{\mathbf w^TS_W\mathbf w}.
$$

# Solving the optimization problem

With the assumption that the underlying distribution of $\mathbf x$ is a multivariate Gaussian distribution. $S_W$ is positive definite; therefore, we can use Cholesky decomposition: $S_W = R^TR,$  where $R \in \Reals^{d\times d}$ is an upper-triangular matrix. Let define $\mathbf v \triangleq R\mathbf w$ and rewrite $\mathbf w^TS_W \mathbf w$:

$$
\begin{aligned}
\mathbf w^T S_W \mathbf w &= \mathbf w^TR^TR\mathbf w \\
&=  (R\mathbf w)^T R\mathbf w \\
&= \mathbf v^T \mathbf v.
\end{aligned}
$$

Because $\mathbf w = R^{-1}\mathbf v$, we have

$$
\begin{aligned}
\mathbf w^TS_B\mathbf w &= \mathbf (R^{-1}\mathbf v)^T S_B  R^{-1}\mathbf v \\
&= \mathbf v^T \underbrace{(R^{-1})^T S_B  R^{-1}}_{\triangleq A}\mathbf v.
\end{aligned}
$$

With this reparameterization, the optimization problem is simplified to 

$$
\mathbf v^* = \argmax_{\mathbf v \in \Reals^d; \|\mathbf v \| = 1} \frac{\mathbf  v^T A \mathbf v}{\mathbf v^T\mathbf v}.
$$

This is the Rayleigh quotient, and it can be shown that the maximum is attained when $\mathbf v^*$ is the eigenvalue corresponds to the largest eigenvalue $\lambda^*$ (See ... for the proof) . Therefore, we have

$$
\begin{aligned}
A \mathbf v^* &= \lambda^* \mathbf v^* \\
((R^{-1})^T S_B  R^{-1}) R \mathbf  w^* &= \lambda^*  R \mathbf w^* \\
R^T(R^{-1})^T S_B  I \mathbf w^* &= \lambda^*  R^T R \mathbf w^* \\
S_B \mathbf w^* &= \lambda^*  S_W \mathbf w^* \\
(S_W)^{-1}S_B \mathbf w^* &= \lambda^* \mathbf w^*
\end{aligned}
$$

Noting here that $S_B$ is the outer product of the vector $\mathbf \mu_1 - \mathbf \mu_2$; hence $\text{rank}(S_B) = 1$. Therefore, $S_B \mathbf w^*$ is in the direction of $\mathbf \mu_1 - \mathbf \mu_2$. With this observation, we do not need  to solve the eigenvalue problem above and rather compute

$$
\mathbf w^* \propto (S_W)^{-1} (\mathbf \mu_1 - \mathbf \mu_2).
$$

<div align="center">
  <img src="https://i.imgur.com/JawTd9C.png"/>
  <div style="color: gray">Fig. 2: Projection direction that maximizes the class separation and minimize the variance of the distributions along the projection direction.</div>
</div>


# Decision Boundary

So far, what we have now is a direction in space that maximally separates the two classes once they are projected onto this direction. To prediction whether a sample belongs to which class, we can derive  the discriminant function of this projection. Let $\omega_1$  and $\omega_2$ be the two classes we consider. We know that 

$$
P(\omega_i|\mathbf x) \propto p(\mathbf x | \omega_i) P(\omega_i).
$$

Using Bayes' decision theory, we decide $\mathbf x$  to belong to $\omega_1$ if $P(\omega_1| \mathbf x ) > P(\omega_2| \mathbf x )$ and vice versa; hence the decision boundary lies at $P(\omega_1| \mathbf x ) - P(\omega_2| \mathbf x ) = 0$.  Applying logarithm, we have

$$
\log p(\mathbf x| \omega_1) + \log P(\omega_1) - \log p(\mathbf x| \omega_2) - \log P(\omega_2) = 0.
$$

Let  assume that after the projection the data of each class follows a Gaussian distribution (in this case one dimension). The equation is reduced to

$$
- \frac{(\mathbf x - \mathbf \mu_1)^2}{\sigma_1^2} + \log P(\omega_1) + \frac{(\mathbf x - \mathbf \mu_2)^2}{\sigma_2^2} - \log P(\omega_2) = 0.
$$

If we assume that $P(\omega_1) = P(\omega_2)$ , the decision boundary then depends only on $\mathbf \mu_1, \mathbf \mu_2, \sigma_1, \sigma_2$, which can be estimated using maximum likelihood. Furthermore, one might further assume that $\sigma_1 = \sigma_2$, hence they can be dropped from the equation. In this case, the decision boundary becomes the point between $\mu_i$'s, which yields a linear decision boundary, called Linear Discriminant Analysis (LDA).  On the other hand, if we estimate $\sigma_i$'s and use them, we have a quadratic decision boundary, called Quadratic Discriminant Analysis (QDA), i.e. it can curve following the data distributions.

Below are decision boundaries derived from these two cases on three different datasets. 

<div align="center">
  <img src="https://i.imgur.com/D6Tb5Ud.png"/>
  <div style="color: gray">Fig. 3: Decision boundaries from LDA and QDA on three different datasets. Numbers on the bottom right of each plot are test set accuracies.</div>
</div>

# Appendix

[Google Colab](https://colab.research.google.com/drive/1bJBVpycSFNOSsBZlDIrzBySZ3TOP9w2u#scrollTo=ntAEMWpOUXCu) used for making Figure 3.

Some references for this blog:
- Thalles Silva's [an illustrative introduction to Fisher's Linear Discriminant](https://sthalles.github.io/fisher-linear-discriminant/);
- Duda et al. (2012), Pattern Classification. Chapter 4.10;
- Dr. Guangliang Chen's [Lecture Slide: Rayleigh Quotients](https://www.sjsu.edu/faculty/guangliang.chen/Math253S20/lec4RayleighQuotient.pdf).

## Proof: Maximization Rayleigh Quotient

Consider a symmetric and positive definite $A \in \Reals^{d\times d}$. Denote $\mathbf v \in \Reals^d$  the vector that we seek under the following objective:

$$
\argmax_{\mathbf v \in \Reals^d} \underbrace{\frac{\mathbf v^T A \mathbf v}{\mathbf v^T\mathbf v}}_{\triangleq J(\mathbf v)}.
$$

Because $\mathbf v$ would be scale invariant, we only need to find the solution in a unit ball, i.e. $\| \mathbf v \| = 1$.  Because A is symmetric and positive definite, we know that it can be diagonalizable. In particular, the diagonalization is $A = Q\Sigma Q^T$, where $Q$ is an orthogonal matrix and $\Sigma$ is an diagonal matrix. We can write the nominator as follows:

$$
\begin{aligned}
\mathbf v^T A \mathbf v  &= \mathbf v^T Q\Sigma Q^T  \mathbf v \\
&= ( Q^T \mathbf v )^T \Sigma \underbrace{Q^T  \mathbf v}_\mathbf u \\
&= \mathbf u^T \Sigma \mathbf u.
\end{aligned}
$$

We can see that

$$
\begin{aligned}
\|\mathbf u \| &= \mathbf u ^T \mathbf u \\
&= \mathbf v^T Q^T Q \mathbf v \\
&= \mathbf v^T \mathbf v \\
&= 1
\end{aligned}
$$

Without loss of generality, let's first assume that the eigenvalues of $A$  is $\lambda_1 \ge \lambda_2 \ge \dots \ge \lambda_n$. Because $\Sigma$ is a diagonal matrix, we know that 

$$
\begin{aligned}
\mathbf u^T \Sigma \mathbf u = \sum_{i=1}^d \lambda_i u_i^2.
\end{aligned}
$$

With the assumption that the eigenvalues are in descending order, it implies that $u_1^2=1$ and  $u_i^2=0, \forall i\ne1$. Hence, we have $\max \mathbf u^{*T} \Sigma \mathbf {u}^* = \lambda_1$   and $\mathbf u^*$  is the basis vector (after the rotation with the eigen basis) corresponding to $\lambda_1$, i.e. $\mathbf u^* = [1, 0, \dots, 0]^T$. Therefore, we have  $\mathbf v^* = Q\mathbf u^*$, which is the eigenvector corresponding to $\lambda_1$. ◾️

Conversely, if the problem is minimization, the minimum is attained at $\lambda_d$.