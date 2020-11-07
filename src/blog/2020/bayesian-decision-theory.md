---
path: "/blog/2020-bayesian-decision-theory"
date: "2020-11-07"
title: "Bayesian Decision Theory and Discriminant Function"
---

*A summary of Duda et al. (2020), Pattern Classification. Chapter 2.*

Machine learning is about extracting useful information from the data we have. Often, this is referred to as modeling. Consider a situation where we have collected fish data and we want to build a classifier, classifying whether the fish is salmon.

Let assume that each fish has $d$ continuous attributes, such as weights and body length, that we measure; mathematically, we write $\mathbf x \in \Reals^d$. The simplest way to build such a classifier is to choose a decision threshold  based on each class's histogram of a certain attribute.

<div align="center">
  <img src="https://i.imgur.com/nXxRLOb.png"/>
  <div style="color: gray">Fig. 1: Distributions of each group's feature; dashed line is the decision boundary.</div>
</div>

Although the process is straight forward, it is quite tedious if $d$  is large, i.e. we would not be able to inspect $d$ plots efficiently. Moreover, there might be some correlation between some attributes for each class.

## Bayesian Decision Theory

First, denote $\omega_1$and $\omega_2$ class labels, i.e. salmon and non-salmon. Using Bayes' rule, we write

$$
P(\omega_1|\mathbf x) = \frac{p(\mathbf x| \omega_1)P(\omega_1)}{P(\mathbf x)},
$$

where $P(\cdot)$ and $p(\cdot)$ denote probability and likelihood respectively. So, the decision whether we classify $\mathbf x$ as $\omega_1$ (salmon) or $\omega_1$ (non-salmon) can be based on comparing the posteriors $P(\omega_1|\mathbf x)$ and $P(\omega_2|\mathbf x)$. More precisely, we classify $\mathbf x$ as  $\omega_1$ if $P(\omega_1|\mathbf x) > P(\omega_2|\mathbf x)$ and vice versa. With this decision rule, the probability of making error ($\text{Err}$) would be

$$
P(\text{Err}|\mathbf x) =  \left\{ \begin{array}{ll}
   P(\omega_2|\mathbf x) & \text{if decide}\ \omega_1 \\
   P(\omega_1|\mathbf x) & \text{if decide}\ \omega_2 \\
\end{array}
\right.
$$

Therefore, the expected error would be

$$
P(\text{Err}) = \int P(\text{Err}, \mathbf x) \text{d}\mathbf x = \int P(\text{Err}| \mathbf x) P(\mathbf x) \text{d}\mathbf x.
$$

Because our decision rule yields the smallest error for each $\mathbf x$, the expected error would be also minimized; the decision rule is called **Bayes' decision rule**.

## Discriminant Function

Recall that $P(\omega_1|\mathbf x)$  is a multiplication of two terms : the likelihood $p(\mathbf x| \omega_1)$ and the class probability $P(\omega_1)$. Because both terms are between zero and one and computer sometimes can not represent small value well (i.e. underflow issue), operating with the current form might lead to numerical instability. Fortunately, we observation that the decision based on comparing $P(\omega_1|\mathbf x)$  and $P(\omega_2|\mathbf x)$ is insensitive to monotonic transformation such as logarithm; therefore, we can instead operate on this transformation. In particular, we define a discriminant function $g$  as

$$
g_i(\mathbf x) \triangleq \log p(\mathbf x|\omega_i) + \log P(\omega_i).
$$

### Multivariate Gaussian Cases

Imaging now that we want to build the fish classifier with all $d$ attributes. We assume that these attributes are from each category's multivariate Gaussian distribution, i.e. the two groups (salmon and non-salmon) have their own set of parameters for the distribution. We will look at three cases:

- C1: The two distributions have the same covariate $\Sigma$, and it is $\Sigma \triangleq \sigma^2 I_d$;
- C2: The two distributions have the same covariate $\Sigma$, but we do not know the structure of it;
- C3: The two distributions have different covariates $\Sigma_1$ and $\Sigma_2$.

Let recall the density function of a multivariate Gaussian distribution $\mathcal{N}(\mathbf \mu, \Sigma)$:

$$
p(\mathbf x) = \frac{1}{ (2\pi)^{d/2} |\Sigma|^2}\exp{\bigg(-\frac{1}{2}(\mathbf{x} - \mathbf{\mu})^T\Sigma^{-1}(\mathbf x -\mathbf \mu) \bigg)}.
$$

Because we assume that $\mathbf x \sim \mathcal N(\mathbf \mu_1, \Sigma_1)$  if $\mathbf x$ is salmon and $\mathcal N(\mathbf \mu_2, \Sigma_2)$  otherwise, e can write the discriminant function as

$$
\begin{aligned}
g_i(\mathbf x) &= \log p(\mathbf x| \omega_i) + \log P(\omega_i) \\
&= - \underbrace{ \frac{d}{2} \log (2\pi)}_{(❶)} -  \underbrace{\frac{1}{2} \log |\Sigma_i|}_{(❷)} - \underbrace{\frac{1}{2}(\mathbf x - \mathbf u_i)^T\Sigma_i^{-1}(\mathbf x - \mathbf u_i)}_{(❸)} + \underbrace{\log P(\omega_i)}_{(❹)}.
\end{aligned}
$$

From the deviation, we  see that ❶ does not depend on any distribution parameter ($\mathbf \mu$, $\Sigma)$; thus, it can be dropped.


### Case C1: $\Sigma_1 = \Sigma_2 = \Sigma = \sigma^2 I_d$

In this case, ❷ can be also dropped, leaving us with $g_i(\mathbf x) = ❸ + ❹$. Then, we have 

$$
\begin{aligned}
g_i(\mathbf x) &= -\frac{1}{2}\bigg[ \mathbf x^T\Sigma^{-1} \mathbf x - 2 \mathbf x^T\Sigma^{-1} \mathbf \mu_i + \mathbf \mu_i^T\Sigma^{-1} \mathbf \mu_i \bigg] + \log P(\omega_1).
\end{aligned}
$$

Furthermore, the term $\mathbf x^T\Sigma^{-1} \mathbf x$ is the same for the two groups, we can also drop it. Using the fact that $\Sigma^{-1} = \frac{1}{\sigma^2}I_d$, we can rewrite the discriminant function as

$$
\begin{aligned}
g_i(\mathbf x) &= \mathbf x^T\underbrace{\frac{\mathbf{\mu}_i}{\sigma^2}}_{\mathbf w_i} \underbrace{-\frac{\mathbf{\mu}_i^T \mathbf{\mu}_i}{2\sigma^2} + \log P(\omega_i)}_{b_{i}}.
\end{aligned}
$$

With this result, we can find the decision boundary from $g_1(\mathbf x) - g_2(\mathbf x) = 0$:

$$
\begin{aligned}
0 &= g_1(\mathbf x) - g_2(\mathbf  x) \\
&= (\mathbf{w}_1^T\mathbf x + b_1) - (\mathbf{w}_2^T\mathbf x + b_2) \\
&= (\mathbf{w}_1 - \mathbf{w}_2)^T \mathbf x + (b_1 - b_2) \\
&= \frac{(\mathbf \mu_1 - \mathbf \mu_2)^T\mathbf x  }{\sigma^2} + \bigg ( -\frac{\mathbf{\mu}_1^T \mathbf{\mu}_1}{2\sigma^2} + \log P(\omega_1) +\frac{\mathbf{\mu}_2^T \mathbf{\mu}_2}{2\sigma^2} + \log P(\omega_2) \bigg ) \\
&= (\mathbf \mu_1 - \mathbf \mu_2)^T\mathbf x  + \bigg ( -\frac{\mathbf{\mu}_1^T \mathbf{\mu}_1}{2} + \sigma^2 \log P(\omega_1) +\frac{\mathbf{\mu}_2^T \mathbf{\mu}_2}{2} + \sigma^2  \log P(\omega_2) \bigg ) \\
&= (\mathbf \mu_1 - \mathbf \mu_2)^T\mathbf x  - \bigg ( \frac{\mathbf{\mu}_1^T \mathbf{\mu}_1 - \mathbf{\mu}_2^T \mathbf{\mu}_2}{2} + \sigma^2 \log \frac{P(\omega_1)}{P(\omega_2)}   \bigg ) \\
&= (\mathbf \mu_1 - \mathbf \mu_2)^T\mathbf x  - \bigg ( \frac{(\mathbf{\mu}_1 - \mathbf{\mu}_2) ^T (\mathbf{\mu}_1 + \mathbf{\mu}_2)}{2}   + \sigma^2 \log \frac{P(\omega_1)}{P(\omega_2)}    \cdot \frac{(\mathbf{\mu}_1 - \mathbf{\mu}_2)^T(\mathbf{\mu}_1 - \mathbf{\mu}_2)}{(\mathbf{\mu}_1 - \mathbf{\mu}_2)^T(\mathbf{\mu}_1 - \mathbf{\mu}_2)} \bigg ) \\
&= (\mathbf \mu_1 - \mathbf \mu_2)^T \bigg( \mathbf x - \underbrace{\frac{(\mathbf{\mu}_1 + \mathbf{\mu}_2)}{2}   + \sigma^2 \log \frac{P(\omega_1)}{P(\omega_2)}    \cdot \frac{(\mathbf{\mu}_1 - \mathbf{\mu}_2)}{\|\mathbf{\mu}_1 - \mathbf{\mu}_2\|^2}}_{\mathbf x_0} \bigg ).
\end{aligned}
$$

<div align="center">
  <img src="https://i.imgur.com/8VcKKkj.png"/>
  <div style="color: gray">Fig. 2: Case 1's decision boundary</div>
</div>

### Case C2: $\Sigma_1 = \Sigma_2 = \Sigma$ 

In this case, the derivation of the decision boundary is similar to the first case. More precisely, we have

$$
\begin{aligned}
0 &= \bigg(\Sigma^{-1}(\mathbf \mu_1 - \mathbf \mu_2)\bigg)^T \bigg( \mathbf x - \frac{\mathbf \mu_1 + \mathbf \mu_2}{2} - \log \frac{P(\omega_1)}{P(\omega_2)}\cdot\frac{(\mu_1 - \mu_2)}{\mathbf (\mu_1 - \mu_2) \Sigma^{-1} (\mu_1 - \mu_2)}  \bigg).
\end{aligned}
$$

<div align="center">
  <img src="https://i.imgur.com/ytL5C49.png"/>
  <div style="color: gray">Fig. 3: Case 2's decision boundary</div>
</div>

### Case C3:  $\Sigma_1 \ne \Sigma_2$

In this case, we can only drop ❶. Follow the same derivation except not dropping ❷, we get 

$$
\begin{aligned}

0 = \mathbf{x}^T \overbrace{\frac{(\Sigma_2^{-1} - \Sigma_1^{-1})}{2}}^{A} \mathbf x  &+ \mathbf x^T\overbrace{(\Sigma_1^{-1}\mathbf \mu_1 - \Sigma_2^{-1}\mathbf \mu_2) }^\mathbf b\\
&+ \underbrace{\bigg( \frac{\mathbf \mu_2 \Sigma^{-1}_2 \mathbf \mu_2 - \mathbf \mu_1 \Sigma^{-1}_1 \mathbf \mu_1 }{2}\bigg) 
+ \log{\frac{P(\omega_1)}{P(\omega_2)}} - \frac{1}{2}\log\frac{|\Sigma_1|}{|\Sigma_2|}}_{c}.

\end{aligned}
$$

This can be written as $\mathbf x^T A \mathbf x + \mathbf x^T \mathbf b + c.$ This is a quadratic equation in $\mathbf x$; hence, the decision boundary would be hyperquadric surfaces.

<div align="center">
  <img src="https://i.imgur.com/1kR4sQH.png"/>
  <div style="color: gray">Fig. 4: Case 3's decision boundary</div>
</div>

## Appendix

Figures are produced from [a Google Colab's notebook](https://colab.research.google.com/drive/1BXYvMHMCL3uzy5OCEkW2JbBP07LkQ_8b?usp=sharing).